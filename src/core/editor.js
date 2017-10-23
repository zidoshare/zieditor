import CodeMirror from 'codemirror'
import initMarked from './initMarked'
import 'codemirror/lib/codemirror.css'
import './index.css'
import util from './util'
import '../styles/style.css'
import 'highlight.js/styles/solarized-light.css'

function importAll(r) {
  r.keys().forEach(r)
  return r.keys()
}
function resolveModes(){
  return importAll(require.context('codemirror/mode/', true, /\.js$/))
}
function resolveThemes(){
  return importAll(require.context('codemirror/theme/',true,/\.css$/))
}

const marked = initMarked()

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

  const themeSelection = document.createElement('select')
  let themes = resolveThemes()
  
  themes = themes.map(theme => {
    return theme.slice(2,theme.length - 4)
  })
  themes = ['default'].concat(themes)
  
  themes.forEach(key => {
    const option = document.createElement('option')
    option.innerHTML = key
    themeSelection.append(option)
  })
  document.body.appendChild(themeSelection)
  
  resolveModes()
  let editor = CodeMirror.fromTextArea(editNode,{
    mode:{name: 'gfm',
      tokenTypeOverrides: {
        emoji: 'emoji',
      }},
    autofocus: true,
    lineWrapping: false, 
    styleActiveLine: true,
    lineNumbers: false,
    smartIndent:false,
    theme:'default'
  })
  themeSelection.addEventListener('change',function(e){
    editor.setOption('theme',e.target.value)
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