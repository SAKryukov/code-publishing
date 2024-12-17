/**
 * JSON patterns
 *
 * @author Sergey A Kryukov
 */
RuleSet.extend('json', [
    {
        name: namingScheme.operator,
        pattern: /[\[|\]|\{|}]/g
    },
    {
        name: namingScheme.property,
        pattern: /".*?"\s*?(?=:)/g
    },
    {
        name: namingScheme.literal.string,
        pattern: /".*?"/g
    },

]);
