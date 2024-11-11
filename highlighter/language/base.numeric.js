/**
* @Sergey A Kryukov
*/
RuleSet.extend("base.numeric", [
    {
        name: 'constant.value.numeric',
        pattern: /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
    },
]);
