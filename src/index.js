import CodeEditor from './lib/codeEditor'
import marked from './lib/marked/marked.js'
import util from './util.js'

function zieditor(node, previewNode, opt) {
  this.node = node
  this.options = opt || this.options
  this.previewNode = previewNode
  this.marked = marked
}

zieditor.prototype.options = {
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
}

zieditor.prototype.create = function () {
  this.editor = CodeEditor.fromTextArea(this.node, {
    mode: {
      name: 'gfm',
      tokenTypeOverrides: {
        emoji: 'emoji',
      }
    },
    lineNumbers: true,
    theme: 'default',
    scrollbarStyle: null,
  })
  console.log(this.editor)
  this.marked.setOptions(this.options)
  this.editor.on('change', util.throttle(this.preview.bind(this), 50))
  var scroll = util.throttle(function (cm) {
    var top = cm.getScrollInfo().top
    var line = cm.lineAtHeight(top, 'local')
    // console.log(line,top,cm.heightAtLine(line,'local'),cm.heightAtLine(line + 1,'local'))
    util.scroll(this.previewNode,top,200)
  }, 0)
  this.editor.on('scroll', scroll.bind(this))
}
zieditor.prototype.destroyed = function () {
  this.editor.toTextArea()
}
zieditor.prototype.reCreate = function () {
  this.editor.toTextArea()
  this.create()
}

zieditor.prototype.parse = function () {
  return this.marked(this.editor.getValue())
}

zieditor.prototype.preview = function () {
  this.previewNode.innerHTML = this.parse()
}

zieditor.prototype.keyMap = function (k) {
  this.editor.setOption('keyMap', k)
}
export default zieditor