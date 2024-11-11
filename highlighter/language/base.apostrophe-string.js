/**
* @Sergey A Kryukov
*/
RuleSet.extend("base.apostrophe-string", [
    {
        matches: {
            1: {
                name: "string",
                matches: {
                    name: "string.character.escape",
                    pattern: /\\'{1}/g
                }
            }
        },
        pattern: /(((')([^\\\1]|\\.)*?(\3)))/gm
    },
]);
