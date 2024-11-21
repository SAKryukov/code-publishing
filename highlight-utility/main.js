"use strict";

window.onload = () => {
    const inputLanguage = document.querySelector("select");
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const convert = document.getElementById("convert");
    const copy = document.getElementById("copy");
    const demo = document.querySelector("pre");

    /* 
    // method to collect all pattern names from all languages:
    const _researchHandler = () => {
        const nameSet = new Set();
        const nameList = [];
        const reportPattern = (name, language, indirect) => {
            if (nameSet.has(name)) return;
            nameList.push(`${name} (${indirect? "indirect": "direct"} ${language})`);
            nameSet.add(name);
        } //reportPattern
        const collectPattern = (language, pattern, indirect) => {
            if (pattern.name != null)
                reportPattern(pattern.name, language, indirect);
            else if (pattern.matches != null) {
                for (let matchIndex in pattern.matches)
                    for (let innerPattern in pattern.matches[matchIndex]) {
                        if (!isNaN(innerPattern) && pattern.matches[matchIndex].constructor == String) {
                            reportPattern(pattern.matches[matchIndex], language, true);
                        } else
                            collectPattern(language, innerPattern, true);
                } //loop
            } //if
        }; //reportPattern
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
        const result = highlighter.colorize(source, inputLanguage.value);
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
