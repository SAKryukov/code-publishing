/**
 * C patterns
 *
 * @author Daniel Holden
 * @author Craig Campbell
 * @author Sergey A Kryukov
 */
RuleSet.extend('c', [
    {
        name: 'preprocessor.keyword',
        pattern: /#(define|elif|else|endif|error|if|ifdef|ifndef|import|include|line|pragma|undef|using)\b/g
    },
    {
        name: 'meta.preprocessor',
        matches: {
            1: [
                {
                    matches: {
                        1: 'keyword.define',
                        2: 'entity.name'
                    },
                    pattern: /(\w+)\s(\w+)\b/g
                },
                {
                    name: 'keyword.define',
                    pattern: /endif/g
                },
                {
                    name: 'constant.numeric',
                    pattern: /\d+/g
                },
                {
                    matches: {
                        1: 'keyword.include',
                        2: 'string'
                    },
                    pattern: /(include)\s(.*?)$/g
                }
            ]
        },
        pattern: /\#([\S\s]*?)$/gm
    },
    {
        name: namingScheme.keyword,
        pattern: /\b(do|goto|typedef|struct|union|enum)\b/g
    },
    {
        matches: {
            1: 'storage.type',
            3: 'storage.type',
            4: 'entity.name.function'
        },
        pattern: /\b((un)?signed|const)? ?(void|char|short|int|long|float|double)\*? +((\w+)(?= ?\())?/g
    },
    {
        matches: {
            2: 'entity.name.function'
        },
        pattern: /(\w|\*) +((\w+)(?= ?\())/g
    },
    {
        name: 'storage.modifier',
        pattern: /\b(static|extern|auto|register|volatile|inline)\b/g
    },
], ["base.comment-block-c", "base.comment-c", "base.string-c"]);
