import marked from 'marked'
import highlight from 'highlight.js'
export default () => {
  const InlineLexer = marked.InlineLexer
  //增加toc解析
  InlineLexer.rules.toc = /\s*\[TOC\]/
  
  var renderer = new marked.Renderer()
  renderer.toc = function (items) {
    var html = '<div id="toc" class="toc"><ul class="toc-tree">'
    html += items
    html += '</ul></div>'
    return html
  }
  renderer.tocItem = function (id, level, text) {
    return '<li class="toc-item toc-level-'
      + level
      + '"><a class="toc-link" href="#'
      + id
      + '"><span class="toc-number"></span> <span class="toc-text">'
      + text
      + '</span></a></li>'
  }
  renderer.heading = function (text, level) {
    var escapedText = text.toLowerCase()
    return '<h' + level + '><a name="' +
      escapedText +
      '" class="anchor" href="#' +
      escapedText +
      '"><span class="header-link"></span></a>' +
      text + '</h' + level + '>'
  }

  marked.Parser.prototype.parse = function (src) {
    var me = this, tocItems = ''
    //预生成好目录标签
    src.forEach(function (token) {
      if (token.type == 'heading') {
        let id = token.text.toLowerCase()
        tocItems += me.renderer.tocItem(id, token.depth, token.text)
      }
    })
    this.inline = new InlineLexer(src.links, this.options, this.renderer)
    this.inline.tocHTML = me.renderer.toc(tocItems)
    this.tokens = src.reverse()

    var out = ''
    while (this.next()) {
      out += this.tok()
    }
    return out
  }
  InlineLexer.prototype.output = function (src) {
    var out = ''
      , link
      , text
      , href
      , cap

    while (src) {
      //toc语法
      if (cap = this.rules.toc.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.tocHTML
        continue
      }
      // escape
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length)
        out += cap[1]
        continue
      }

      // autolink
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length)
        if (cap[2] === '@') {
          text = cap[1].charAt(6) === ':'
            ? this.mangle(cap[1].substring(7))
            : this.mangle(cap[1])
          href = this.mangle('mailto:') + text
        } else {
          text = escape(cap[1])
          href = text
        }
        out += this.renderer.link(href, null, text)
        continue
      }

      // url (gfm)
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        src = src.substring(cap[0].length)
        text = escape(cap[1])
        href = text
        out += this.renderer.link(href, null, text)
        continue
      }

      // tag
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false
        }
        src = src.substring(cap[0].length)
        out += this.options.sanitize
          ? this.options.sanitizer
            ? this.options.sanitizer(cap[0])
            : escape(cap[0])
          : cap[0]
        continue
      }

      // link
      if (cap = this.rules.link.exec(src)) {
        src = src.substring(cap[0].length)
        this.inLink = true
        out += this.outputLink(cap, {
          href: cap[2],
          title: cap[3]
        })
        this.inLink = false
        continue
      }

      // reflink, nolink
      if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length)
        link = (cap[2] || cap[1]).replace(/\s+/g, ' ')
        link = this.links[link.toLowerCase()]
        if (!link || !link.href) {
          out += cap[0].charAt(0)
          src = cap[0].substring(1) + src
          continue
        }
        this.inLink = true
        out += this.outputLink(cap, link)
        this.inLink = false
        continue
      }

      // strong
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.strong(this.output(cap[2] || cap[1]))
        continue
      }

      // em
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.em(this.output(cap[2] || cap[1]))
        continue
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.codespan(escape(cap[2], true))
        continue
      }

      // br
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.br()
        continue
      }

      // del (gfm)
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.del(this.output(cap[1]))
        continue
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length)
        out += this.renderer.text(escape(this.smartypants(cap[0])))
        continue
      }

      if (src) {
        throw new Error('Infinite loop on byte: ' + src.charCodeAt(0))
      }
    }

    return out
  }

  const markedOptions = {
    renderer: renderer,
    gfm: true,
    tabled: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return highlight.highlightAuto(code).value
    }
  }
  marked.setOptions(markedOptions)
  return marked
}