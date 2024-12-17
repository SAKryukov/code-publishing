/**
* @Sergey A Kryukov
*/
RuleSet.extend("base.comment-block-c", [
    { 
        name: namingScheme.comment.block,
        pattern: /\/\*(([\r\n]|.)*?)\*\//gm
    }

]);
