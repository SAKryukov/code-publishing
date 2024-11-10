/**
* C# patterns
*
* @author Sergey A Kryukov
*/
RuleSet.extend('csharp', [
    { 
        name: 'keyword',
        pattern: /const/g
    }
], ["base.comment-block-c", "base.comment-c", "base.string-c"]);
