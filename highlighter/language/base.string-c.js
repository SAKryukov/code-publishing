/**
* @author Sergey A Kryukov
*/
RuleSet.extend("base.string-c", [
    {
        matches: {
            1: {
                name: namingScheme.literal.string,
                matches: {
                    name: namingScheme.literal.escape,
                    pattern: /\\"{1}/g
                }
            }
        },
        pattern: /(((")([^\\\1]|\\.)*?(\3)))/gm
    },
]);
