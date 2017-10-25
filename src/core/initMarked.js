import marked from '../lib/marked'
import highlight from 'highlight.js'
export default () => {
  const markedOptions = {
    renderer: new marked.Renderer(),
    gfm: true,
    tabled: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return highlight.highlightAuto(code).value
    }
  }
  marked.setOptions(markedOptions)
  return marked
}