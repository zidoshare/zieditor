import CodeMirror from './lib/codemirror/lib/codemirror'
require('./lib/codemirror/addon/edit/continuelist')
require('./lib/codemirror/addon/mode/overlay')
import marked from './lib/marked/marked.js'
require('./lib/codemirror/mode/markdown/markdown')
require('./lib/codemirror/mode/gfm/gfm')
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
  this.editor = CodeMirror.fromTextArea(this.node, {
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
  this.marked.setOptions(this.options)
  this.editor.on('change', util.throttle(this.preview.bind(this), 50))
  var scroll = util.throttle(function (cm) {
    var top = cm.getScrollInfo().top
    var line = cm.lineAtHeight(top, 'local')
    // console.log(line,top,cm.heightAtLine(line,'local'),cm.heightAtLine(line + 1,'local'))
    this.previewNode.scrollTop = top
  }, 0)
  this.editor.on('scroll', scroll.bind(this))
  util.addHandler(this.previewNode, 'mousewheel', util.throttle(function (e) {
    //计算鼠标滚轮滚动的距离
    var v = e.wheelDelta / 2
    this.editor.scrollTo(0, this.previewNode.scrollTop - v)
    this.previewNode.scrollTop -= v
    //阻止浏览器默认方法
    e.preventDefault();
  }.bind(this), 0))
}
zieditor.prototype.destroyed = function () {
  this.editor.toTextArea()
}
zieditor.prototype.reCreate = function () {
  this.editor.toTextArea()
  this.create()
}

zieditor.prototype.parse = function () {
  console.log('parse')
  return this.marked(this.editor.getValue())
}

zieditor.prototype.preview = function () {
  this.previewNode.innerHTML = this.parse()
}

zieditor.prototype.keyMap = function (k) {
  this.editor.setOption('keyMap', k)
}
export default zieditor