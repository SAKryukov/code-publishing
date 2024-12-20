/**
 * C patterns
 *
 * @author Daniel Holden
 * @author Craig Campbell
 * @author Sergey A Kryukov
 */
RuleSet.extend('c', [
    {
        matches: {
            1: namingScheme.preprocessor.signature,
            2: namingScheme.preprocessor.keyword,
            3: namingScheme.preprocessor.value,
        },
        pattern: /(#)(include|define|elif|else|endif|error|ifdef|ifndef|if|import|line|pragma|undef|using)(.*?)$/gm
    },
    {
        name: namingScheme.keyword,
        pattern: /\b(alignas|alignof|auto|bool|break|case|char|const|constexpr|continue|default|do|double|else|enum|extern|false|float|for|goto|if|inline|int|long|nullptr|register|restrict|return|short|signed|sizeof|static|static_assert|struct|switch|thread_local|true|typedef|typeof|typeof_unqual|union|unsigned|void|volatile|while|_Alignas|_Alignof|_Atomic|_BitInt|_Bool|_Complex|_Decimal128|_Decimal32|_Decimal64|_Generic (C11)|_Imaginary|_Noreturn|_Static_assert|_Th)\b/g
    },
    {
        matches: {
            1: namingScheme.type.keyword,
            3: namingScheme.type.keyword,
            4: namingScheme.name.function
        },
        pattern: /\b((un)?signed|const)? ?(void|char|short|int|long|float|double)\*? +((\w+)(?= ?\())?/g
    },
    {
        matches: {
            2: namingScheme.name.function
        },
        pattern: /(\w|\*) +((\w+)(?= ?\())/g
    },
    {
        name: namingScheme.storage.modifier,
        pattern: /\b(static|extern|auto|register|volatile|inline)\b/g
    },
], ["base.comment-block-c", "base.comment-c", "base.string-c"]);
