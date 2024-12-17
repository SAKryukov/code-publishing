/**
* C# patterns
*
* @author Sergey A Kryukov
*/
RuleSet.extend('csharp', [
    { 
        name: 'keyword',
        pattern: /\b(abstract|add|alias|ascending|as|async|await|base|break|case|catch|checked|class|const|continue|default|delegate|descending|do|dynamic|else|enum|event|explicit|extern|finally|fixed|foreach|for|from|get|global|goto|group|if|implicit|interface|internal|into|in|is|join|let|lock|namespace|new|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sealed|select|set|sizeof|stackalloc|static|struct|switch|this|throw|try|typeof|unchecked|unsafe|using|value|var|virtual|void|volatile|where|while|yield)\b/g
    },
    { 
        name: 'type.keyword',
        pattern: /\b(bool|byte|char|decimal|double|float|int|object|sbyte|short|string|uint|ulong|ushort)\b/g
    },
    { 
        name: 'constant.keyword',
        pattern: /\b(true|false|null)\b/g
    },
], [
    "base.comment-block-c",
    "base.comment-c",
    "base.numeric",
    "base.string-c",
    "base.apostrophe.character",
]);
