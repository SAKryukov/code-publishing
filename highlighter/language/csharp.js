/**
* C# patterns
*
* @author Sergey A Kryukov
*/
RuleSet.extend("csharp", [
    {
        matches: {
            1: namingScheme.preprocessor.signature,
            2: namingScheme.preprocessor.keyword,
            3: namingScheme.preprocessor.value,
        },
        pattern: /(#)(nullable|if|elif|else|endif|define|undef|region|endregion)(.*?)$/gm
    },
    { 
        name: namingScheme.keyword,
        pattern: /\b(abstract|add|alias|ascending|as|async|await|base|break|case|catch|checked|class|const|continue|default|delegate|descending|do|dynamic|else|enum|event|explicit|extern|finally|fixed|foreach|for|from|get|global|goto|group|if|implicit|interface|internal|into|in|is|join|let|lock|namespace|new|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sealed|select|set|sizeof|stackalloc|static|struct|switch|this|throw|try|typeof|unchecked|unsafe|using|value|var|virtual|void|volatile|where|while|yield)\b/g
    },
    { 
        name: namingScheme.type.keyword,
        pattern: /\b(bool|byte|char|decimal|double|float|int|object|sbyte|short|string|uint|ulong|ushort|nint|nuint)\b/g
    },
    { 
        name: namingScheme.literal.keyword,
        pattern: /\b(true|false|null|\.Empty|\.E|\.Epsilon|\.MaxValue|\.MinValue|NaN|\.NegativeInfinity|\.NegativeZero|	\.Pi|\.PositiveInfinity|\.Tau|\.MinusOne|\.One|\.Zero)\b/g
    },
], [
    "base.comment-block-c",
    "base.comment-c",
    "base.numeric",
    "base.string-c",
    "base.apostrophe.character",
]);
