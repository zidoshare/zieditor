import CodeMirror from 'codemirror'
import marked from 'marked'
import 'codemirror/lib/codemirror.css'
import './index.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/selection/active-line'
import util from './util'
import themes from '../themes'
import '../styles/style.css'
import highlight from 'highlight.js'
import 'highlight.js/styles/solarized-light.css'
themes.map(theme => {
  if(theme !== 'default')
    require(`codemirror/theme/${theme}.css`)
})

marked.setOptions({
  renderer:new marked.Renderer(),
  gfm:true,
  tabled:true,
  breaks:false,
  pedantic:false,
  sanitize:true,
  smartLists:true,
  smartypants:false,
  highlight: function(code) {
    console.log(arguments)
    return highlight.highlightAuto(code).value
  }
})

const render = (editNode,previewNode) => {
  const putHtml = (content) => {
    previewNode.innerHTML = content
  }
  const scroll = (top) => {
    previewNode.scrollTop = top
  }
  const parse = function(value){
    return marked(value)
  }
  console.log('ok')
  const btn = document.createElement('button')
  btn.innerHTML = '下一个皮肤' 
  document.body.appendChild(btn)
  let editor = CodeMirror.fromTextArea(editNode,{
    mode:'markdown',
    autofocus: true,
    lineWrapping: true, 
    foldGutter: true,
    styleActiveLine: true,
    lineNumbers: false,
  })
  btn.addEventListener('click',function(){
    var theme = 'abcdef'
    editor.setOption('theme', theme)
    location.hash = '' + theme
  })
  editor.on('change',util.throttle(function(){
    putHtml(parse(editor.getValue()))
  },200))

  const callback = util.throttle(scroll,0)
  editor.on('scroll',function(cm){
    callback(cm.getScrollInfo().top)
  })
  return editor
}

export default render