var fs = require('fs')
var data = fs.readFileSync('./test/files/react-start.md', 'utf-8')
var marked = require('./lib/marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

let out = marked(data)

fs.writeFileSync('./test/output/tocTest.html', out)