/**
* Java patterns
*
* @author Leo Accend
* @author Sergey A Kryukov
*/
RuleSet.extend( "java", [
  {
    name: namingScheme.literal.keyword,
    pattern: /\b(false|null|true|[A-Z_]+)\b/g
  },
  {
    matches: {
      1: namingScheme.keyword,
      2: namingScheme.name.namespace,
    },
    pattern: /(import|package)\s(.+)/g
  },
  {
    // see http://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
    name: namingScheme.keyword,
    pattern: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/g
  },
  {
    name: namingScheme.annotation,
    pattern: /@\w+/g
  },
  {
    matches: {
      1: namingScheme.name.function
    },
    pattern: /([^@\.\s]+)\(/g
  },
  {
    name: namingScheme.name.class,
    pattern: /\b([A-Z]\w*)\b/g
  },
  {
    // see http://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html
    name: namingScheme.operator,
    pattern: /(\+{1,2}|-{1,2}|~|!|\*|\/|%|(?:&lt;){1,2}|(?:&gt;){1,3}|instanceof|(?:&amp;){1,2}|\^|\|{1,2}|\?|:|(?:=|!|\+|-|\*|\/|%|\^|\||(?:&lt;){1,2}|(?:&gt;){1,3})?=)/g
  }
], ["base.string-c", "base.comment-block-c", "base.comment-c"]);
