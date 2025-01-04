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
    pattern: /\{title\}|\@toc|\{no\-toc\}|@include|@numbering/g
  },
  { // abbr
    name: namingScheme.keyword,
    pattern: /(\*\{.+?\}.+?\*)/g
  },
  { //attribute:
    name: namingScheme.keyword,
    pattern: /\{([a-z]+?)\=([^\"^\{^\}]+?)\}/g
  },
  { //CSS class:
    name: namingScheme.keyword,
    pattern: /\{\.([^\"^\{^\}]+?)\}/g
  },
  { //properties under @numbering:
    name: namingScheme.property,
    pattern: /(h[123456]\.separator|h[123456]\.prefix|h[123456]\.suffix|h[123456]\.standalone|h[123456]\.start|enabled|enable|defaultStart|defaultSeparator|defaultPrefix|defaultSuffix)/gi
  },
  
], ["markdown"]);
