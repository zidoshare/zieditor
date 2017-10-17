import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import './index.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/selection/active-line'
import themes from '../themes'

themes.map(theme => {
  if(theme !== 'default')
    require(`codemirror/theme/${theme}.css`)
})

const render = () => {
  const btn = document.createElement('button')
  btn.innerHTML = '下一个皮肤'
  document.body.appendChild(btn)
  let editor = CodeMirror.fromTextArea(document.getElementById('zieditor-markdown'),{
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
  return editor
}
export default render