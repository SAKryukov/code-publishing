/**
 * JSON patterns
 *
 * @author Sergey A Kryukov
 */
RuleSet.extend('json', [
    {
        name: 'operator',
        pattern: /[\[|\]|\{|}]/g
    },
    {
        name: 'property',
        pattern: /".*?"\s*?(?=:)/g
    },
    {
        name: 'string',
        pattern: /".*?"/g
    },

]);
