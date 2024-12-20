/**
* @author Sergey A Kryukov
*/
RuleSet.extend("base.comment-number-sign", [
    { 
        name: namingScheme.comment.text,
        pattern: /#(.*?)$/gm
    }
]);
