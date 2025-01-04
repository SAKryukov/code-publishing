/**
* C# patterns
*
* @author Sergey A Kryukov
* See:
  https://marketplace.visualstudio.com/items?itemName=sakryukov.extensible-markdown
*/
RuleSet.extend("extensible-markdown", [
    { 
        name: namingScheme.keyword,
        pattern: /(\@toc|\{notoc\}|\@include|@numbering|\{title\})/g
    },
    { 
      name: namingScheme.property,
      pattern: /(h[123456]\.separator|h[123456]\.prefix|h[123456]\.suffix|h[123456]\.standAlong|h[123456]\.start|enabled|enable|defaultStart|defaultSeparator|defaultPrefix|defaultSuffix)/g
  },
], [ "markdown" ]);
