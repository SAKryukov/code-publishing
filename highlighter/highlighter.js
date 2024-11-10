"use strict";

/**
 * Syntax highlighter
 *
 * @author Sergey A Kryukov, https://www.SAKryukov.org
 * @author Craig Campbell, original author of Rainbow, see https://github.com/ccampbell/rainbow
*/

const RuleSet = {
    inheritanceMap: {},
    patterns: {},
    aliases: {},
    extend: function (language, languagePatterns, baseLanguages) {
        // If we extend a language again we shouldn't need to specify the
        // inheritence for it. For example, if you are adding special highlighting
        // for a javascript function that is not in the base javascript rules, you
        // should be able to do
        //
        // RuleSet.extend('javascript', [ ... ]);
        //
        // Without specifying a language it should inherit (generic in this case)
        if (!this.inheritanceMap[language])
            this.inheritanceMap[language] = baseLanguages;
        this.patterns[language] = languagePatterns.concat(this.patterns[language] || []);
    }, //RuleSet.extend
    addAlias: function (alias, originalLanguage) { // to take into account
        this.aliases[alias] = originalLanguage;
    }, //RuleSet.addAlias
    getPatternsForLanguage: function(language) {
        if (this.patterns[language] == null)
            language = this.aliases[language];
        let patterns = this.patterns[language] || [];
        const addInheritedPatterns = (ruleSet, patternSet, currentLanguage) => {
            const baseLanguageList = ruleSet.inheritanceMap[currentLanguage];
            if (baseLanguageList == null) return patternSet;
            if (baseLanguageList.constructor != Array) return patternSet;
            for (let currentBaseLanguage of baseLanguageList) {
                patternSet = patternSet.concat(ruleSet.patterns[currentBaseLanguage] || []);
                addInheritedPatterns(ruleSet, patternSet, currentBaseLanguage);
            } //loop
            return patternSet;
        } //addInheritedPatterns
        patterns = addInheritedPatterns(this, patterns, language);
        return patterns;
    } //RuleSet.getPatternsForLanguage
}; //RuleSet

/////////////////////////////////////////////////////////////////////////////////////////////

/**
     * Highlighter is a class used to highlight individual blocks of code
     *
     * @class
     */
const Highlighter = function Highlighter(options) {

    const hasCompleteOverlap = (start1, end1, start2, end2) => {
        // If the starting and end positions are exactly the same
        // then the first one should stay and this one should be ignored.
        if (start2 === start1 && end2 === end1)
            return false;
        return start2 <= start1 && end2 >= end1;
    }; //Highlighter.hasCompleteOverlap

    const intersects = (start1, end1, start2, end2) => {
        if (start2 >= start1 && start2 < end1)
            return true;
        return end2 > start1 && end2 < end1;
    }; //Highlighter.intersects

    const replaceAtPosition = (position, replace, replaceWith, code) => {
        const subString = code.substr(position);
        // This is needed to fix an issue where $ signs do not render in the
        // highlighted code
        //
        // @see https://github.com/ccampbell/rainbow/issues/208
        replaceWith = replaceWith.replace(/\$/g, '$$$$');
        return code.substr(0, position) + subString.replace(replace, replaceWith);
    }; //Highlighter.replaceAtPosition;

    /**
         * Sorts an objects keys by index descending
         * @param {Object} object
         * @return {Array}
         */
    const keys = object => {
        const locations = [];
        for (let location in object) {
            if (object.hasOwnProperty(location))
                locations.push(location);
        } //loop
        // numeric descending
        return locations.sort((a, b) => b - a);
    }; //Highlighter.keys

    const htmlEntities = (code) =>
        code.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&(?![\w\#]+;)/g, '&amp;');

    /**
     * Finds out the position of group match for a regular expression
     *
     * @see http://stackoverflow.com/questions/1985594/how-to-find-index-of-groups-in-match
     * @param {Object} match
     * @param {number} groupNumber
     * @return {number}
     */
    const indexOfGroup = (match, groupNumber) => {
        let index = 0;
        for (let i = 1; i < groupNumber; ++i) {
            if (match[i])
                index += match[i].length;
        }
        return index;
    }; //Highlighter.indexOfGroup

    let replacements = {};
    let replacementPositions = {};

    /**
     * Determines if the match passed in falls inside of an existing match.
     * This prevents a regex pattern from matching inside of another pattern
     * that matches a larger amount of code.
     *
     * For example this prevents a keyword from matching `function` if there
     * is already a match for `function (.*)`.
     *
     * @param {number} startstart position of new match
     * @param {number} end  end position of new match
     * @return {boolean}
     */
    const matchIsInsideOtherMatch = (start, end) => {
        for (let key in replacementPositions) {
            key = parseInt(key, 10);
            // If this block completely overlaps with another block
            // then we should remove the other block and return `false`.
            if (hasCompleteOverlap(key, replacementPositions[key], start, end)) {
                delete replacementPositions[key];
                delete replacements[key];
            } //if
            if (intersects(key, replacementPositions[key], start, end))
                return true;
        } //loop
        return false;
    }; //Highlighter.matchIsInsideOtherMatch

    /**
     * Takes a string of code and wraps it in a span tag based on the name
     *
     * @param {string} name    name of the pattern (ie keyword.regex)
     * @param {string} code    block of code to wrap
     * @param {string} globalClass class to apply to every span
     * @return {string}
     */
    const wrapCodeInSpan = (name, code) => {
        let className = name.replace(/\./g, ' ');
        let globalClass = options.globalClass;
        if (globalClass)
            className += " " + globalClass;
        return ("<span class=\"" + className + "\">" + code + "</span>");
    }; //Highlighter.wrapCodeInSpan

    /**
     * Process replacements in the string of code to actually update
     * the markup
     *
     * @param {string} code     the code to process replacements in
     * @return {string}
     */
    const processReplacements = code => {
        const positions = keys(replacements);
        for (let index = 0, list = positions; index < list.length; ++index) {
            const position = list[index];
            const replacement = replacements[position];
            code = replaceAtPosition(position, replacement.replace, replacement.with, code);
        } //loop
        return code;
    }; //Highlighter.processReplacements

    /**
     * It is so we can create a new regex object for each call to
     * processPattern to avoid state carrying over when running exec
     * multiple times.
     *
     * The global flag should not be carried over because we are simulating
     * it by processing the regex in a loop so we only care about the first
     * match in each string. This also seems to improve performance quite a
     * bit.
     *
     * @param {RegExp} regex
     * @return {string}
     */
    const cloneRegex = regex => {
        let flags = '';
        if (regex.ignoreCase)
            flags += 'i';
        if (regex.multiline)
            flags += 'm';
        return new RegExp(regex.source, flags);
    }; //cloneRegex

    /**
     * Matches a regex pattern against a block of code, finds all matches
     * that should be processed, and stores the positions of where they
     * should be replaced within the string.
     *
     * This is where pretty much all the work is done but it should not
     * be called directly.
     *
     * @param {Object} pattern
     * @param {string} code
     * @param {number} offset
     * @return {mixed}
     */
    const processPattern = (language, pattern, code, offset) => {
        if (offset === void 0) offset = 0;
        let regex = pattern.pattern;
        if (!regex)
            return false;
        // Since we are simulating global regex matching we need to also
        // make sure to stop after one match if the pattern is not global
        const shouldStop = !regex.global;
        regex = cloneRegex(regex);
        const match = regex.exec(code);
        if (!match)
            return false;
        // Treat match 0 the same way as name
        if (!pattern.name && pattern.matches && typeof pattern.matches[0] === 'string') {
            pattern.name = pattern.matches[0];
            delete pattern.matches[0];
        } //if
        let replacement = match[0];
        const startPos = match.index + offset;
        const endPos = match[0].length + startPos;
        // In some cases when the regex matches a group such as \s* it is
        // possible for there to be a match, but have the start position
        // equal the end position. In those cases we should be able to stop
        // matching. Otherwise this can lead to an infinite loop.
        if (startPos === endPos)
            return false;
        // If this is not a child match and it falls inside of another
        // match that already happened we should skip it and continue
        // processing.
        if (matchIsInsideOtherMatch(startPos, endPos)) {
            return {
                remaining: code.substr(endPos - offset),
                offset: endPos
            };
        }; //processPattern

        /**
         * Callback for when a match was successfully processed
         *
         * @param {string} repl
         * @return {void}
         */
        const onMatchSuccess = repl => {
            // If this match has a name then wrap it in a span tag
            if (pattern.name)
                repl = wrapCodeInSpan(pattern.name, repl);
            // For debugging
            // console.log('Replace ' + match[0] + ' with ' + replacement + ' at position ' + startPos + ' to ' + endPos);
            // Store what needs to be replaced with what at this position
            replacements[startPos] = {
                'replace': match[0],
                'with': repl
            };
            // Store the range of this match so we can use it for
            // comparisons with other matches later.
            replacementPositions[startPos] = endPos;
            if (shouldStop)
                return false;
            return {
                remaining: code.substr(endPos - offset),
                offset: endPos
            };
        }; //onMatchSuccess

        /**
         * Helper function for processing a sub group
         *
         * @param {number} groupKey  index of group
         * @return {void}
         */
        const processGroup = (language, groupKey) => {
            const block = match[groupKey];
            // If there is no match here then move on
            if (!block)
                return;
            const group = pattern.matches[groupKey];
            const groupLanguage = group.language;
            /**
             * Process group is what group we should use to actually process
             * this match group.
             *
             * For example if the subgroup pattern looks like this:
             *
             * 2: {
             * 'name': 'keyword',
             * 'pattern': /true/g
             * }
             *
             * then we use that as is, but if it looks like this:
             *
             * 2: {
             * 'name': 'keyword',
             * 'matches': {
             *      'name': 'special',
             *      'pattern': /whatever/g
             *  }
             * }
             *
             * we treat the 'matches' part as the pattern and keep
             * the name around to wrap it with later
             */
            const groupToProcess = group.name && group.matches ? group.matches : group;
            /**
             * Takes the code block matched at this group, replaces it
             * with the highlighted block, and optionally wraps it with
             * a span with a name
             *
             * @param {string} passedBlock
             * @param {string} replaceBlock
             * @param {string|null} matchName
             */
            const getReplacement = (passedBlock, replaceBlock, matchName) => {
                replacement = replaceAtPosition(indexOfGroup(match, groupKey), passedBlock, matchName ? wrapCodeInSpan(matchName, replaceBlock) : replaceBlock, replacement);
                return;
            }; //getReplacement
            // If this is a string then this match is directly mapped
            // to selector so all we have to do is wrap it in a span
            // and continue.
            if (typeof group === 'string') {
                getReplacement(block, block, group);
                return;
            } //if
            let localCode;
            let highlighter = new Highlighter(options);
            // If this is a sublanguage go and process the block using
            // that language
            if (groupLanguage) {
                localCode = highlighter.colorize(block, groupLanguage);
                getReplacement(block, localCode);
                return;
            }
            // The process group can be a single pattern or an array of
            // patterns. `processCodeWithPatterns` always expects an array
            // so we convert it here.
            localCode = highlighter.colorize(block, language, groupToProcess.length ? groupToProcess : [groupToProcess]);
            getReplacement(block, localCode, group.matches ? group.name : 0);
        } //processGroup

        // If this pattern has sub matches for different groups in the regex
        // then we should process them one at a time by running them through
        // the processGroup function to generate the new replacement.
        //
        // We use the `keys` function to run through them backwards because
        // the match position of earlier matches will not change depending
        // on what gets replaced in later matches.
        const groupKeys = keys(pattern.matches);
        for (let index = 0, list = groupKeys; index < list.length; ++index) {
            const groupKey = list[index];
            processGroup(language, groupKey);
        } //loop
        // Finally, call `onMatchSuccess` with the replacement
        return onMatchSuccess(replacement);
    }; //processPattern

    /**
     * Processes a block of code using specified patterns
     *
     * @param {string} code
     * @param {Array} patterns
     * @return {string}
     */
    const processCodeWithPatterns = (language, code, patternsList) => {
        for (let pattern of patternsList) {
            let result = processPattern(language, pattern, code);
            while (result)
                result = processPattern(language, pattern, result.remaining, result.offset);
        } //loop
        // We are done processing the patterns so we should actually replace
        // what needs to be replaced in the code.
        return processReplacements(code);
    }; //processCodeWithPatterns

    this.colorize = (code, language, patterns) => {
        const patternList = patterns || RuleSet.getPatternsForLanguage(language);
        // important fix: clean-up:
        replacements = {};
        replacementPositions = {};
        return processCodeWithPatterns(language, htmlEntities(code), patternList);
    } //this.colorize

}; //Highlighter
