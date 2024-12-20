/**
* Pascal, Turbo Pascal, Object Pascal, Delphi Padcal and Free Pascal language patterns
*
* @author Sergey A Kryukov
*/
RuleSet.extend("pascal", [
    {
        name: namingScheme.comment.pascal,
        pattern: /(\{(.|[\r\n])*?\})/gm
    },
    {
        matches: {
            1: {
                name: namingScheme.literal.string,
                matches:
                [{
                    name: namingScheme.literal.escape,
                    pattern: /""{1}/g
                },
                {
                    name: namingScheme.literal.escape,
                    pattern: /''{1}/g
                }],
            }
        },
        pattern: /((("|')([^\\\1]|\\.)*?(\3)))/gm
    },
    {
        name: namingScheme.operator,
        pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g
    },
    {
        name: namingScheme.assignment,
        pattern: /:=/g
    },
    {
        name: namingScheme.keyword,
        pattern: /\b(absolute|and|array|asm|begin|case|const|constructor|destructor|div|do|downto|else|end|file|for|function|goto|if|in|inherited|inline|label|mod|not|object|of|operator|or|packed|procedure|program|record|reintroduce|repeat|self|set|shl|shr|then|to|type|unit|until|uses|var|while|with|xor|as|class|dispinterface|except|exports|finalization|finally|initialization|inline|is|library|on|out|packed|property|raise|resourcestring|threadvar|try)(?=\b)/gi
    },
    { 
        name: namingScheme.type.keyword,
        pattern: /\b(string|real|integer|character|boolean)\b/gi
    },
    {
        name: namingScheme.pascal.part,
        pattern: /\b(interface|implementation)(?=\b)/gi
    },
    { 
        name: namingScheme.literal.keyword,
        pattern: /\b(true|false|nil)\b/g
    },
    {
        name: namingScheme.comment.text,
        pattern: /\/\/.*?$/gm
    }, 

], ["base.comment-c"]);
