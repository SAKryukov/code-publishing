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
        matches: {
            1: namingScheme.keyword, 
            2: namingScheme.keyword,  
            3: namingScheme.keyword,  
            4: namingScheme.keyword,  
            5: namingScheme.keyword,  
            6: namingScheme.keyword,  
        },
        //name: 
        pattern: /(\*{1})[^\*]+?(\*{1})|(\*{2})[^\*]+?(\*{2})|(\*{3})[^\*]+?(\*{3})/g
    },
    { 
        name: namingScheme.keyword, 
        pattern: /(~{3,}|`{3,})/g
    },
]);
