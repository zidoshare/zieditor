var CodeMirror = require('./lib/codemirror/lib/codemirror')
require('./lib/codemirror/addon/edit/continuelist')
require('./lib/codemirror/addon/mode/overlay')
// require('./lib/marked/marked')
require('./lib/codemirror/mode/markdown/markdown')
require('./lib/codemirror/mode/gfm/gfm')

function zieditor(node, opt) {
  var editor = CodeMirror.fromTextArea(node, {
    mode: {
      name: 'gfm',
      tokenTypeOverrides: {
        emoji: 'emoji',
      }
    },
    lineNumbers: true,
    theme: 'default',
  })
}

export default zieditor