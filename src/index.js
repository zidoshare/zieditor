import './index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import marked from 'marked'
hljs.initHighlightingOnLoad()
console.log(marked('I am using __markdown__.'))

if(module.hot){
  module.hot.accept()
}