import zieditor from '../src/index.js'
window.onload = function () {
  var node = document.getElementById('zieditor')
  var editor = new zieditor()
  editor.from(node)
}
// editor.keyMap('vim')

if (module.hot) {
  module.hot.accept('../src/index.js', function () {
    editor.destroyed()
    eidtor = new zieditor()
    editor.from(node)
  })
}