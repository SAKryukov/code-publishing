window.onload = () => {
    const all = document.getElementsByTagName("pre");
    console.log(all);
    const inputLanguage = document.querySelector("select");
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const convert = document.getElementById("convert");
    const copy = document.getElementById("copy");
    const demo = document.querySelector("pre");
    input.value = `class AAA {
    int a = 12;
    int b = 13;
    int c = 14;
    let kk = 15;
    const ff = 18;
    for (let index = 0; index < 10; ++index) {
       @object[index] = index;
    } //loop
}`;

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
        } else if (event.ctrlKey && event.code == "KeyC") {
            copyHandler();
            event.preventDefault();
        } else if (event.ctrlKey && event.code == "Insert") {
            copyHandler();
            event.preventDefault();
        } //if
    } //window.onkeydown

    input.focus();

};
