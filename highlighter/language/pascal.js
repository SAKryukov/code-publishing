/**
* Pascal, Turbo Pascal, Object Pascal, Delphi Padcal and Free Pascal language patterns
*
* @author Sergey A Kryukov
*/
RuleSet.extend('pascal', [
    {
        name: 'comment.block.pascal',
        pattern: /(\{(.|[\r\n])*?\})/gm
    },
    {
        matches: {
            1: {
                name: "string",
                matches:
                [{
                    name: "string.character.escape",
                    pattern: /""{1}/g
                },
                {
                    name: "string.character.escape",
                    pattern: /''{1}/g
                }],
            }
        },
        pattern: /((("|')([^\\\1]|\\.)*?(\3)))/gm
    },
    /*
    {
        matches: {
            1: [
                {
                    name: 'keyword.operator',
                    pattern: /\=|\+/g
                },
                {
                    name: 'keyword.dot',
                    pattern: /\./g
                }
            ],
            2: {
                name: 'string',
                matches: {
                    name: 'constant.character.escape',
                    pattern: /\\("){1}/g
                },
                2: {
                    name: 'character',
                    matches: {
                        name: 'constant.character.escape',
                        pattern: /\\('){1}/g
                    }
                }
            }
        },
        pattern: /(\(|\s|\[|\=|:|\+|\.|\{|,)(('|")([^\\\1]|\\.)*?(\3))/gm
    },*/
    {
        name: 'keyword.operator',
        pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g
    },
    {
        name: 'pascal.assignment',
        pattern: /:=/g
    },
    {
        name: 'keyword',
        pattern: /\b(absolute|and|array|asm|begin|case|const|constructor|destructor|div|do|downto|else|end|file|for|function|goto|if|implementation|in|inherited|inline|interface|label|mod|nil|not|object|of|operator|or|packed|procedure|program|record|reintroduce|repeat|self|set|shl|shr|string|then|to|type|unit|until|uses|var|while|with|xor|as|class|dispinterface|except|exports|finalization|finally|initialization|inline|is|library|on|out|packed|property|raise|resourcestring|threadvar|try)(?=\b)/gi
    },
    {
        name: "comment",
        pattern: /\/\/.*?$/gm
    }, 

], ['base.comment-c']);
