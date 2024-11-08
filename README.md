# Code Publishing

Utility for publishing code articles in a manner similar to [CodeProject](https://www.CodeProject.com)

[CodeProject](https://www.CodeProject.com) is presently out of business and the articles are only accessible on a read-only basis.
This facility is being developed to compensate for the lack of this valuable resource.

One of the goals of this development is to provide smooth operation with [Extensible Markdown](https://marketplace.visualstudio.com/items?itemName=sakryukov.extensible-markdown).
Extensible Markdown offers a way to create publications using Markdown and export them in HTML, using advanced Markdown extensions. The most important predefined extension automatically creates and references TOC with optional flexible and configurable auto-numbering.

The code highlighter is based on the study of Craig Campbell's [Rainbow](https://github.com/ccampbell/rainbow) and borrowing some essential parts of its code. Most of the code is radically rewritten and greatly simplified. Node support was found defunct and is removed. Separate pieces of code
have been rewritten using more modern JavaScript, and multiple problems have been solved.

### Live Play

[Syntax highlighting utility](https://sakryukov.github.io/code-publishing/highlight-utility/index.html)

[Color Names](https://sakryukov.github.io/color-names-js-wpf/code/js) (from the repository [SAKryukov/color-names-js-wpf](https://github.com/SAKryukov/color-names-js-wpf), useful for styling)

[Artilce demo](https://sakryukov.github.io/code-publishing/demo/index.html)

### Credits:

Original [Rainbow](https://github.com/ccampbell/rainbow) contributors:
Craig Campbell, Daniel Holden, Dan Stewart, Matthew Brennan Jones, Javier Aguirre, Bruno Dias, Leo Accend, Nijiko Yonskai, Simon Potter, Matthew King, Alex Queiroz, Frank Shearar, and Jan Navratil.

Their names and contributions can be found in [highlighter/language](https://github.com/SAKryukov/code-publishing/tree/main/highlighter/language).
