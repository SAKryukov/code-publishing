/**
* @author Sergey A Kryukov
*/
RuleSet.extend("base.comment-c", [
    { 
        name: namingScheme.comment.text,
        pattern: /\/\/(.*?)$/gm
    }
]);
