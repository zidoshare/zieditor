var Remarkable = require('remarkable')
var hljs = require('highlight.js')

var md = new Remarkable('full', {
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'lang-',
  linkify: true,
  linkTarget: '',

  typographer: false,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) { }
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) { }

    return ''; // use external default escaping
  },
})