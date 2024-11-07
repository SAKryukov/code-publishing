/**
 * JSON patterns
 *
 * @author Sergey A Kryukov
 */
RuleSet.extend('json', [
    {
        name: 'string',
        pattern: /".*?"/g
    },
    {
        name: 'operator',
        pattern: /[\[|\]|\{|}]/g
    },
    {
        name: 'property',
        pattern: /\".*?"\s*?:/g
    },

]);
