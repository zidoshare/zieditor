import zieditor from '../src/index.js'
import '../src/styles/preview.css'
import '../src/styles/editor.css'
var node = document.getElementById('zieditor')
var previewNode = document.getElementById('zieditor-preview')
var editor = new zieditor(node, previewNode)
editor.create()
// editor.keyMap('vim')

if (module.hot) {
  module.hot.accept('../src/index.js', function () {
    editor.destroyed()
    eidtor = new zieditor(node,previewNode)
    editor.create() 
  })
}