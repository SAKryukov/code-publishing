"use strict";

window.onload = () => {

    const preCodeElements = document.querySelectorAll("pre");
    for (let element of preCodeElements) {
        const summary = document.createElement("summary");
        const language = element.getAttribute("lang");
        if (!language) continue;
        const left = document.createTextNode(language);
        const right = document.createElement("span");
        left.textContent = language;
        right.textContent = String.fromCodePoint(0x1F4CB);
        right.title = element.textContent;
        right.onclick = event => navigator.clipboard.writeText(event.target.title);
        summary.appendChild(left);
        summary.appendChild(right);
        element.parentElement.insertBefore(summary, element);
    } //loop

};
        