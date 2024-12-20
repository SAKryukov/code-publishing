/**
 * CSS patterns
 *
 * @author Sergey A Kryukov
 * @author Craig Campbell
 */
RuleSet.extend("css", [
    {
        name: namingScheme.comment.text,
        pattern: /\/\*[\s\S]*?\*\//gm
    },
    {
        matches: {
            1: namingScheme.css.numeric,
            2: namingScheme.css.unit
        },
        pattern: /(\d+)(px|em|cm|s|%)?/g
    },
    {
        name: namingScheme.literal.string,
        pattern: /('|")(.*?)\1/g
    },
    {
        name: namingScheme.property,
        matches: {
            1: namingScheme.css.vendor.prefix,
        },
        pattern: /(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g
    },
    {
        matches: {
            1: [
                {
                    name: namingScheme.css.sass,
                    pattern: /&amp;/g
                },
                {
                    name: namingScheme.css.direct.descendant,
                    pattern: /&gt;/g
                },
                {
                    name: namingScheme.css.class,
                    pattern: /\.[\w\-_]+/g
                },
                {
                    name: namingScheme.css.id,
                    pattern: /\#[\w\-_]+/g
                },
                {
                    name: namingScheme.css.pseudo,
                    pattern: /:[\w\-_]+/g
                },
                {
                    name: namingScheme.css.selector.name,
                    pattern: /\w+/g
                }
            ]
        },
        pattern: /([\w\ ,\n:\.\#\&\;\-_]+)(?=.*\{)/g
    },
    {
        matches: {
            2: namingScheme.css.vendor.prefix,
            3: namingScheme.css.value,
        },
        pattern: /(:|,)\s*(-o-|-moz-|-webkit-|-ms-)?([a-zA-Z-]*)(?=\b)(?!.*\{)/g
    }
]);

RuleSet.addAlias("scss", "css");
