"use strict";

window.onload = () => {
    const inputLanguage = document.querySelector("select");
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const convert = document.getElementById("convert");
    const copy = document.getElementById("copy");
    const demo = document.querySelector("pre");

    /* method to collect all pattern names from all languages:
    const _researchHandler = () => {
        const nameList = [];
        const reportPattern = pattern => {
            if (pattern.name != null)
                nameList.push(pattern.name);
            else if (pattern.matches != null) {
                for (let matchIndex in pattern.matches)
                    for (let innerPattern in pattern.matches[matchIndex])
                        reportPattern(innerPattern);
            } //if
        }; //reportPattern
        for (let index in RuleSet.patterns) {
            const patternSet = RuleSet.patterns[index];
            for (let pattern of patternSet)
                reportPattern(pattern);
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
