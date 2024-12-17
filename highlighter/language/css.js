/**
 * CSS patterns
 *
 * @author Craig Campbell
 */
RuleSet.extend('css', [
    {
        name: namingScheme.comment.text,
        pattern: /\/\*[\s\S]*?\*\//gm
    },
    {
        matches: {
            1: 'constant.numeric',
            2: namingScheme.unit
        },
        pattern: /(\d+)(px|em|cm|s|%)?/g
    },
    {
        name: namingScheme.literal.string,
        pattern: /('|")(.*?)\1/g
    },
    {
        name: 'support.css-property',
        matches: {
            1: 'support.vendor-prefix'
        },
        pattern: /(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g
    },
    {
        matches: {
            1: [
                {
                    name: 'entity.name.sass',
                    pattern: /&amp;/g
                },
                {
                    name: 'direct-descendant',
                    pattern: /&gt;/g
                },
                {
                    name: 'entity.name.class',
                    pattern: /\.[\w\-_]+/g
                },
                {
                    name: 'entity.name.id',
                    pattern: /\#[\w\-_]+/g
                },
                {
                    name: 'entity.name.pseudo',
                    pattern: /:[\w\-_]+/g
                },
                {
                    name: 'entity.name.tag',
                    pattern: /\w+/g
                }
            ]
        },
        pattern: /([\w\ ,\n:\.\#\&\;\-_]+)(?=.*\{)/g
    },
    {
        matches: {
            2: 'support.vendor-prefix',
            3: 'support.css-value'
        },
        pattern: /(:|,)\s*(-o-|-moz-|-webkit-|-ms-)?([a-zA-Z-]*)(?=\b)(?!.*\{)/g
    }
]);

RuleSet.addAlias('scss', 'css');
