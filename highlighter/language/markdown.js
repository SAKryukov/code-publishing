/**
* C# patterns
*
* @author Sergey A Kryukov
*/
RuleSet.extend("markdown", [
    { 
        matches: {
            1: namingScheme.keyword, 
        },
        pattern: /^(#{1,6})\s.+?$/gm
    },
    { 
        name: namingScheme.keyword, 
        pattern: /(\*{1}[^\*]+?\*{1})|(\*{2}[^\*]+?\*{2})|(\*{3}[^\*]+?\*{3})/g
    },
    { 
        name: namingScheme.keyword, 
        pattern: /(~{3,}|`{3,})/g
    },
]);
