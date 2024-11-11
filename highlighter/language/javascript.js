/**
 * Javascript patterns
 *
 * @author Sergey A Kryukov
 */
RuleSet.extend("javascript", [
    {
        matches: {
            1: {
                name: "string",
                matches: {
                    name: "string.character.escape",
                    pattern: /\\('|"|`){1}/g
                }
            }
        },
        pattern: /((('|"|`)([^\\\1]|\\.)*?(\3)))/gm
    },
    {
        name: "magic.strict",
        pattern: /^\s*\"use strict\";\s*$/gm
    },
    {
        name: 'keyword',
        pattern: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|function|if|import|in|instanceof|new|null|return|super|switch|this|throw|true|try|typeof|var|void|while|with|let|static|yield|await|enum|implements|interface|package|private|protected|public)\b/g
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
        matches: {
            1: 'entity.name.function',
        },
        pattern: /(\S*?)\s*?\=\s*?(\(.*?\)|(\S+?))\s*?\=&gt;/g
    },
], [
    "base.comment-block-c",
    "base.comment-c",
    "base.numeric",
]);

RuleSet.addAlias('js', 'javascript');
