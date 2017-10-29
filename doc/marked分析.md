# 对象分析

## lexer：块级词法分析器

包含 tokens（令牌集合），options（设置项），rules(正则匹配表达式集合)。

构造函数如下：
````javascript
function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) { //判断是否是gfm模式
    if (this.options.tables) { //是否启用gfm表，必须是gfm生效的情况下才会设置
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}
````
## InlineLexer：行级词法分析器

## Parser:解析器

## Renderer：渲染器

# 执行过程

> 执行过程可总结为：


调用`Lexer.lex(src,opt)`词法分析器，获取token集合。

使用Parser解析器解析tokens


## 词法分析过程

实例化词法分析器，调用lex方法开始处理，lex方法会替换回车符为`\n`,替换制表符为4个空格，替换unicode`\u00a0`为一个空格，替换`\u2424`为一个回车。调用token方法，
 >`token(src,top,bq)`

共有三个参数，src为原字符串

token方法会依次调用rules的正则表达式做匹配（首先匹配回车），如果匹配到了,将匹配到的字符经过一系列操作生成一个token放入tokens，并将匹配到的字符串从原字符串中截取出去，然后将剩余的字符串继续匹配。
# 关键字 *分析

## lexer

词法分析器

## token


分析用例：heading

匹配正则表达式为：`/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/`

调用正则表达式的exec方法去匹配每一行，如果匹配到，构建一个token，用于描述这个令牌，在heading中，使用`{
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      }`来描述，每个token都有固定的type

令牌，是一个js对象，