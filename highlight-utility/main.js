"use strict";

window.onload = () => {
    const inputLanguage = document.querySelector("select");
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const convert = document.getElementById("convert");
    const copy = document.getElementById("copy");
    const demo = document.querySelector("pre");
    const customWords = document.querySelector("label > input");

    ///* 
    // method to collect all pattern names from all languages:
    const _researchHandler = () => {
        const ruleSet = new Set();
        for (let rule of document.styleSheets[0].cssRules) {
            const terms = rule.selectorText.split(", ");
            for (let wideName of terms) {
                const components = wideName.split(" ");
                if (components.length == 2) {
                    const name = components[1].substring(
                        namingScheme.span.length + 1,
                        components[1].length - namingScheme.highlighter.length - 1);
                    ruleSet.add(name);
                }    
            } //loop
        } // loop ruleSet
        const nameMap = new Map();
        const reportPattern = (name, language) => {
            if (nameMap.has(name))
                nameMap.get(name).push(language);
            else
                nameMap.set(name, [language]);
        } //reportPattern
        const collectPattern = (language, pattern) => {
            if (pattern == null) return;
            if (pattern.name != null)
                reportPattern(pattern.name, language);
            for (let index in pattern)
                if (pattern[index] != null) {
                    if ((Number(index) != NaN) && pattern[index].constructor == String)
                        reportPattern(pattern[index], language);
                    else if (pattern[index].constructor == Object)
                        collectPattern(language, pattern[index]);
                } //if
        }; //collectPattern
        for (let language in RuleSet.patterns) {
            const patternSet = RuleSet.patterns[language];
            for (let pattern of patternSet)
                collectPattern(language, pattern);
        } //loop
        const nameList = ["// Rule names, +: used in CSS, ?: unused:"];
        for (const [name, value] of nameMap) {
            const isUsed = ruleSet.has(name);
            nameList.push(`${isUsed ? "+" : "?"} ${name} (${value.join(", ")})`);
        } //loop
        output.value = nameList.join("\n"); 
    }; //_researchHandler
    //*/

    const selectionHandler = (event) => {
        copy.style.display = event.target.selectionStart == event.target.selectionEnd
            ? "inline" : "none";
    }; //selectionHandler
    input.onpointerup = event => selectionHandler(event);
    input.onkeyup = event => selectionHandler(event);

    const highlighter = new Highlighter({ globalClass: namingScheme.highlighter });
    const convertHandler = () => {
        const source = input.value;
        const result = highlighter.colorize(source, inputLanguage.value, null, customWords.value);
        output.value = result;
        demo.innerHTML = result;
    }; //convertHandler
    const copyHandler = () => navigator.clipboard.writeText(output.value);
    
    convert.onclick = () => convertHandler();
    copy.onclick = () => copyHandler();
    window.onkeydown = event => {
        if (event.code == "F1" && event.ctrlKey) {
            _researchHandler();
            event.preventDefault();
        } else if (event.code == "F2") {
            convertHandler();
            event.preventDefault();
        } else if (input.selectionStart == input.selectionEnd && event.ctrlKey) {
            if (event.code == "Insert") {
                copyHandler();
                event.preventDefault();    
            }
        } //if
    }; //window.onkeydown

    const inputLanguageHandler = () => {
        if (codeSampleMap[inputLanguage.value]) {
            input.value = codeSampleMap[inputLanguage.value].trim();
            convertHandler();
        } //if
    }; //inputLanguageHandler
    inputLanguage.onchange = inputLanguageHandler;
    inputLanguageHandler();

    input.focus();

};
