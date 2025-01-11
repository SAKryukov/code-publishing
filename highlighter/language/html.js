/**
 * HTML patterns
 *
 * @author Craig Campbell
 * @author Sergey A Kryukov
 */
RuleSet.extend("html", [
    {
        name: namingScheme.source.php,
        matches: {
            1: namingScheme.xmltag.php,
            2: {
                language: namingScheme.source.php,
            },
            3: namingScheme.xmltag.php,
        },
        pattern: /(&lt;\?php|&lt;\?=?(?!xml))([\s\S]*?)(\?&gt;)/gm
    },
    {
        name: namingScheme.source.css,
        matches: {
            1: {
                matches: {
                    1: namingScheme.xmltag.style.open,
                    2: [
                        {
                            name: namingScheme.xmltag.style.name,
                            pattern: /^style/g
                        },
                        {
                            name: namingScheme.literal.string,
                            pattern: /('|")(.*?)(\1)/g
                        },
                        {
                            name: namingScheme.xmltag.style.attribute,
                            pattern: /(\w+)/g
                        }
                    ],
                    3: namingScheme.xmltag.style.close,
                },
                pattern: /(&lt;\/?)(style.*?)(&gt;)/g
            },
            2: {
                language: namingScheme.source.css,
            },
            3: namingScheme.xmltag.style.open,
            4: namingScheme.xmltag.style.tag,
            5: namingScheme.xmltag.style.close,
        },
        pattern: /(&lt;style.*?&gt;)([\s\S]*?)(&lt;\/)(style)(&gt;)/gm
    },
    {
        name: namingScheme.source.js,
        matches: {
            1: {
                matches: {
                    1: namingScheme.xmltag.script.open,
                    2: [
                        {
                            name: namingScheme.xmltag.script.name,
                            pattern: /^script/g
                        },
                        {
                            name: namingScheme.literal.string,
                            pattern: /('|")(.*?)(\1)/g
                        },
                        {
                            name: namingScheme.xmltag.script.attribute,
                            pattern: /(\w+)/g
                        }
                    ],
                    3: namingScheme.xmltag.script.close,
                },
                pattern: /(&lt;\/?)(script.*?)(&gt;)/g
            },
            2: {
                language: namingScheme.source.javascript,
            },
            3: namingScheme.xmltag.script.open,
            4: namingScheme.xmltag.script.tag,
            5: namingScheme.xmltag.script.close,
        },
        pattern: /(&lt;script(?! src).*?&gt;)([\s\S]*?)(&lt;\/)(script)(&gt;)/gm
    },
    {
        name: namingScheme.comment.block,
        pattern: /&lt;\!--[\S\s]*?--&gt;/g
    },
    {
        matches: {
            1: namingScheme.xmltag.open,
            2: namingScheme.xmltag.close,
        },
        pattern: /(&lt;)|(\/?\??&gt;)/g
    },
    {
        name: namingScheme.xmltag.all,
        matches: {
            1: namingScheme.xmltag.all,
            2: namingScheme.xmltag.special, // ! or / inside <>
            3: namingScheme.xmltag.name,
        },
        pattern: /(&lt;\??)(\/|\!?)([^&\s]+)/g
    },
    {
        matches: {
            1: namingScheme.xmltag.attribute,
        },
        pattern: /([a-z-]+)(?=\=)/gi
    },
    {
        matches: {
            1: namingScheme.xmltag.operator,
            2: namingScheme.literal.quote,
            3: namingScheme.literal.string,
            4: namingScheme.literal.quote
        },
        pattern: /(=)\s*('|")(.*?)(\2)/g
    },
    { // in script?
        matches: {
            1: namingScheme.xmltag.operator,
            2: namingScheme.xmltag.value,
        },
        pattern: /(=)([a-zA-Z\-0-9]*)\b/g
    },
    {
        matches: { // attribute name
            1: namingScheme.xmltag.attribute,
        },
        pattern: /\s([\w-]+)(?=\s|&gt;)(?![\s\S]*&lt;)/g
    }
]);

RuleSet.addAlias("xml", "html");
