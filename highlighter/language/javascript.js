/**
 * Javascript patterns
 *
 * @author Craig Campbell
 * @author Sergey A Kryukov
 */
RuleSet.extend('javascript', [
    /**
     * matches $. or $(
     */
    {
        name: 'magic.strict',
        pattern: /^\s*\"use strict\";\s*$/gm
    },
    {
        name: 'selector',
        pattern: /\$(?=\.|\()/g
    },
    {
        name: 'support',
        pattern: /\b(window|document)\b/g
    },
    {
        name: 'template.string',
        pattern: /(`(.|[\r\n])*?`)/gm
    },
    {
        name: 'keyword',
        pattern: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|function|if|import|in|instanceof|new|null|return|super|switch|this|throw|true|try|typeof|var|void|while|with|let|static|yield |await|enum|implements|interface|package|private|protected|public)\b/g
    },
    {
        name: 'function.call',
        pattern: /\b(then)(?=\()/g
    },
    {
        name: 'variable.language.this',
        pattern: /\bthis\b/g
    },
    {
        name: 'variable.language.super',
        pattern: /super(?=\.|\()/g
    },
    {
        name: 'storage.type',
        pattern: /\b(const|let|var)(?=\s)/g
    },
    {
        matches: {
            1: 'support.property'
        },
        pattern: /\.(length|node(Name|Value))\b/g
    },

    /**
     * matches any escaped characters inside of a js regex pattern
     *
     * @see https://github.com/ccampbell/rainbow/issues/22
     *
     * this was causing single line comments to fail so it now makes sure
     * the opening / is not directly followed by a *
     *
     * The body of the regex to match a regex was borrowed from:
     * http://stackoverflow.com/a/17843773/421333
     */
    {
        name: 'string.regexp',
        matches: {
            1: 'string.regexp.open',
            2: {
                name: 'constant.regexp.escape',
                pattern: /\\(.){1}/g
            },
            3: 'string.regexp.close',
            4: 'string.regexp.modifier'
        },
        pattern: /(\/)((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)(\/)(?!\/)([igm]{0,3})/g
    },

    // matches runtime function declarations
    {
        matches: {
            1: 'storage.type',
            3: 'entity.function'
        },
        pattern: /(var)?(\s|^)(\S+)(?=\s?=\s?function\()/g
    },

    // matches constructor call
    {
        matches: {
            1: 'keyword',
            2: 'variable.type'
        },
        pattern: /(new)\s+(?!Promise)([^\(]*)(?=\()/g
    },

    // matches any function call in the style functionName: function()
    {
        name: 'entity.function',
        pattern: /(\w+)(?=:\s{0,}function)/g
    },
    {
        name: 'constant.other',
        pattern: /\*(?= as)/g
    },
    {
        matches: {
            1: 'keyword',
            2: 'constant.other'
        },
        pattern: /(export)\s+(\*)/g
    },
    {
        matches: {
            1: 'entity.name.function',
        },
        pattern: /(\S*?)\s*?\=\s*?\(.*?\)\s*?\=&gt;\s*?\{/g
    },
    {
        matches: {
            1: 'storage.type.accessor',
            2: 'entity.name.function'
        },
        pattern: /(get|set)\s+(\w+)(?=\()/g
    },
    {
        matches: {
            2: 'entity.name.function'
        },
        pattern: /(^\s*)(\w+)(?=\([^\)]*?\)\s*\{)/gm
    },
    {
        matches: {
            1: 'storage.type.class',
            2: 'entity.name.class',
            3: 'storage.modifier.extends',
            4: 'entity.other.inherited-class'
        },
        pattern: /(class)\s+(\w+)(?:\s+(extends)\s+(\w+))?(?=\s*\{)/g
    },
    {
        name: 'storage.type.function.arrow',
        pattern: /=&gt;/g
    },
    {
        name: 'support.class.promise',
        pattern: /\bPromise(?=(\(|\.))/g
    }
], 'generic');

RuleSet.addAlias('js', 'javascript');
