// let nodes = document.querySelectorAll('.zieditor-markdown')
import render from './core/editor'
render()

if(module.hot){
  module.hot.accept('./core/editor.js',function(){
    var nodes = document.querySelector('.CodeMirror.cm-s-default.CodeMirror-wrap')
    nodes.remove()
    const render = require('./core/editor').default
    render()
  })
}