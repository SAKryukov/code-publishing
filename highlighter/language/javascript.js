/**
 * Javascript patterns
 *
 * @author Sergey A Kryukov
 */
RuleSet.extend("javascript", [
    {
        matches: {
            1: {
                name: namingScheme.literal.string,
                matches: {
                    name: namingScheme.literal.escape,
                    pattern: /\\('|"|`){1}/g
                }
            }
        },
        pattern: /((('|"|`)([^\\\1]|\\.)*?(\3)))/gm
    },
    {
        matches: {
            1: namingScheme.magic.strict,
        },
        pattern: /^\s*(\"use strict\";)\s*$/gm
    },
    {
        name: namingScheme.keyword,
        pattern: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|function|if|import|in|instanceof|new|null|return|super|switch|this|throw|true|try|typeof|var|void|while|with|let|static|yield|await|enum|implements|interface|package|private|protected|public)\b/g
    },
    // matches constructor call:
    {
        matches: {
            1: namingScheme.keyword,
            2: namingScheme.literal.keyword,
        },
        pattern: /(new)\s+([^\(]*)(?=\()/g
    },
    // matches arrow function declaration: //SA???
    {
        matches: {
            1: namingScheme.name.function, 
        },
        pattern: /(\S*?)\s*?(\=|\:)\s*?(\(.*?\)|(\S+?))\s*?\=&gt;/g
    },
    {
        matches: {
            1: namingScheme.keyword,
            2: namingScheme.name.function, 
        },
        pattern: /(function)\s+(.*?)\(/g
    },
], [
    "base.comment-block-c",
    "base.comment-c",
    "base.numeric",
]);

RuleSet.addAlias("js", "javascript");
