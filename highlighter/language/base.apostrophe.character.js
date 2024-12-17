/**
* @Sergey A Kryukov
*/
RuleSet.extend("base.apostrophe.character", [
    {
        matches: {
            1: {
                name: "constant.value.character",
                matches: {
                    name: namingScheme.literal.escape,
                    pattern: /\\'{1}/g
                }
            }
        },
        pattern: /(((')([^\\\1]|\\.)*?(\3)))/gm
    },
]);
