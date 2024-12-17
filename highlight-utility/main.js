"use strict";

window.onload = () => {
    const inputLanguage = document.querySelector("select");
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const convert = document.getElementById("convert");
    const copy = document.getElementById("copy");
    const demo = document.querySelector("pre");
    const customWords = document.querySelector("label > input");

    /* 
    // method to collect all pattern names from all languages:
    const _researchHandler = () => {
        const nameSet = new Set();
        const nameList = [];
        const reportPattern = (name, language) => {
            if (nameSet.has(name)) return;
            nameList.push(`${name} (${language})`);
            nameSet.add(name);
        } //reportPattern
        const collectPattern = (language, pattern) => {
            if (pattern == null) return;
            if (pattern.name != null) {
                reportPattern(pattern.name, language);
            } //if
            for (let index in pattern)
                if ((pattern[index] != null) && (pattern[index].constructor == Object))
                    collectPattern(language, pattern[index]);
        }; //collectPattern
        for (let language in RuleSet.patterns) {
            const patternSet = RuleSet.patterns[language];
            for (let pattern of patternSet)
                collectPattern(language, pattern);
        } //loop
        output.value = nameList.join("\n"); 
    }; //_researchHandler
    */

    const selectionHandler = (event) => {
        copy.style.display = event.target.selectionStart == event.target.selectionEnd
            ? "inline" : "none";
    }; //selectionHandler
    input.onpointerup = event => selectionHandler(event);
    input.onkeyup = event => selectionHandler(event);

    const highlighter = new Highlighter({ globalClass: "highlighter" });
    const convertHandler = () => {
        const source = input.value;
        const result = highlighter.colorize(source, inputLanguage.value, null, customWords.value);
        output.value = result;
        demo.innerHTML = result;
    }; //convertHandler
    const copyHandler = () => navigator.clipboard.writeText(output.value);
    
    convert.onclick = () => convertHandler();
    //convert.onclick = () => _researchHandler();
    copy.onclick = () => copyHandler();
    window.onkeydown = event => {
        if (event.code == "F2") {
            convertHandler();
            event.preventDefault();
        } else if (input.selectionStart == input.selectionEnd && event.ctrlKey) {
            if (event.code == "KeyC" || event.code == "Insert") {
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
