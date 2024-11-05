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
        pattern: /#(if|elif|else|endif|ifdef|ifndef|elifdef|elifndef|define|undef|include|line|error|warning|pragma|defined|__has_include|__has_cpp_attribute|export|import|module)\b/g
    },
    /*
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
    */
    {
        name: 'keyword',
        pattern: /\b(do|goto|typedef)\b/g
    },
    {
        name: 'entity.label',
        pattern: /\w+:/g
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
    {
        name: 'support.type',
        pattern: /\b(struct|union|enum)\b/g
    },
], 'generic');
