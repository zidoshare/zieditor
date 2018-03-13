import util from '../../util'
import selectionUtil from '../../selectionUtil'
import $ from '../../zQuery'
function CodeEditor() {

}

var block = {
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/,
}
var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  // url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/]*)*?\/?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
  code: /^(`+)(\s*)([\s\S]*?[^`]?)\2\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  // del: noop,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
}
CodeEditor.fromTextArea = function (node) {
  var editor = document.createElement('div')
  editor.contentEditable = true
  editor.className=(editor.className || '') + 'zieditor-edit-area'
  var size = util.clientSize(node)
  node.parentNode.replaceChild(editor, node)
  var obj = new CodeEditor()
  obj.editor = editor
  obj.size = size
  obj.handlers = {}
  editor.innerHTML = '<div><br/></div>'
  util.addHandler(editor, 'input', function () {
    if(!this.innerText){
      this.innerHTML = '<div><br/></div>'
    }
    var selection = selectionUtil.getSelection()
    
    var currentNode = selection.anchorNode.parentNode
    
    var parentNode = currentNode.parentNode
    while (parentNode && parentNode != editor) {
      currentNode = parentNode
      parentNode = currentNode.parentNode
    }
    currentNode = $(currentNode)
    if (!currentNode) {
      obj.handlers['change'](this.innerText)
      return
    }
    var text = currentNode.text()
    currentNode.appendClass('zieditor-item')
    var cap = block.heading.exec(text)
    if (cap) {
      var len = cap[1].length
      currentNode.node.className = currentNode.node.className.replace(/ *zieditor-heading-[\d+] */, '').replace('zieditor-heading','')
      currentNode.appendClass('zieditor-heading-' + len,'zieditor-heading')
    } else {
      currentNode.node.className = currentNode.node.className.replace(/ *zieditor-heading-[\d+] */, '').replace('zieditor-heading','')
    }
    // cap = inline.strong.exec(text)
    // console.log(text,cap)
    obj.handlers['change'](this.innerText)
  }.bind(editor))
  return obj
}
CodeEditor.prototype.toTextArea = function () {
  this.editor = null
  this.size = {}
}

CodeEditor.prototype.on = function (event, handler) {
  this.handlers[event] = handler
}

CodeEditor.prototype.getValue = function () {
  return this.editor.innerText
}

CodeEditor.prototype.setOption = function () {

}

export default CodeEditor