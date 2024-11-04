"use strict";

const codeSampleMap = {

////////////////////////////////////////////////

javascript: `

class AAA {
    value = 3;
    constructor () {
        let s = \`multiline \${this.value}
              template string\`;
    }
} //class AAA

`,

////////////////////////////////////////////////

csharp: `

class AAA {
    int a = 12;
    int b = 13;
    int c = 14;
    let kk = 15;
    const ff = 18;
    void F() {
        for (let index = 0; index < 10; ++index) {
           @object[index] = index;
           target[index] = index + 1;
        } //loop
    } //F
} //class AAA

`,

////////////////////////////////////////////////

html: `

<!DOCTYPE html>
<head>
    <script src="../highlighter/highlighter.js"></script>
    <script src="../highlighter/language/generic.js"></script>
    <script src="../highlighter/language/c.js"></script>
    <script src="../highlighter/language/csharp.js"></script>
    <script src="../highlighter//language/javascript.js"></script>
    <script src="../highlighter/language/css.js"></script>
    <script src="../highlighter/language/html.js"></script>
    <script src="../highlighter/language/java.js"></script>
    <script src="../highlighter/language/json.js"></script>
    <script src="code-samples.js"></script>
    <script src="main.js"></script>
    <style>
        @import url(../highlighter/style.css);
        * { font-family: sans-serif; }
        textarea { width: 100%; height: 20em; }
        textarea:last-of-type { height: 10em; }
    </style>
</head>
<html lang="en-US">
<body>
    <select>
        <option value="javascript">JavaScript</option>
        <option selected="true" value="csharp">C#</option>
        <option value="c">C++</option>
        <option value="css">CSS</option>
        <option value="html">HTML</option>
        <option value="java">Java</option>
        <option value="json">JSON</option>
    </select>
    <br/>
    <textarea id="input" spellcheck="false">
    </textarea>
    <br />
    <button id="convert">F2: Convert</button> <button id="copy">Ctrl+C or Ctrl+Insert: Copy</button>
    <br />
    <textarea id="output" spellcheck="false" readonly="true">
    </textarea>
    <pre></pre>
</html>

`,

////////////////////////////////////////////////

}
