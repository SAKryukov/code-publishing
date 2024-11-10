/**
* @Sergey A Kryukov
*/
RuleSet.extend("base.comment-block-c", [
    { 
        name: 'comment.block',
        pattern: /\/\*(([\r\n]|.)*?)\*\//gm
    }

]);
