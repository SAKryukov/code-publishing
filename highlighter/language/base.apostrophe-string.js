/**
* @Sergey A Kryukov
*/
RuleSet.extend("base.apostrophe-string", [
    {
        matches: {
            1: {
                name: namingScheme.string.value,
                matches: {
                    name: namingScheme.string.character.escape,
                    pattern: /\\'{1}/g
                }
            }
        },
        pattern: /(((')([^\\\1]|\\.)*?(\3)))/gm
    },
]);
