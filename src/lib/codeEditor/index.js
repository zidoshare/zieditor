import util from '../../util'
function CodeEditor(){

}

CodeEditor.fromTextArea = function(node){
  var editor = document.createElement('div')
  editor.setAttribute('contentEditable','true')
  var size = util.clientSize(node)
  editor.style.height = '100%'
  editor.style.width = '100%'
  node.parentNode.replaceChild(editor,node)
  var obj = new CodeEditor()
  obj.editor = editor
  obj.size = size
  obj.handlers = {}
  editor.innerHTML = '<div><br/></div>'
  util.addHandler(editor,'input',function(){
    obj.handlers['change'](this.innerText)
  }.bind(editor))
  return obj
}

CodeEditor.prototype.toTextArea = function(){
  this.editor = null
  this.size = {}
}

CodeEditor.prototype.on = function(event,handler){
  this.handlers[event] = handler
}

CodeEditor.prototype.getValue = function(){
  return this.editor.innerText
}

CodeEditor.prototype.setOption = function(){

}

export default CodeEditor