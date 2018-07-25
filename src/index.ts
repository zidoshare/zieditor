import * as hljs from 'highlight.js'
import { addClass, hasClass, removeClass } from './utils/className'
let mdHtml, mdSrc, permallink, scrollMap
export interface ZiMarkedOption {
  html?: boolean,
  xhtmlOut?: boolean,
  breaks?: boolean,
  langPrefix?: string,
  linkify?: boolean,
  linkTarget?: '',
  typographer?: boolean,

  _highlight?: boolean,
  _strict?: boolean,
  _view?: string,
  hightlight?(str: string, lang: string): string
}
let defaults = {
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  linkTarget: '',
  typographer: true,

  _highlight: true,
  _strict: false,
  _view: 'html',
  hightlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) { }
    }
    try {
      return hljs.highlightAuto(str).value
    } catch (__) { }
    return ''
  }
}

function setOptionClass(name: string, val: string) {
  if (val) {
    addClass(document.body, `opt_${name}`);
  } else {
    removeClass(document.body, `opt_${name}`)
  }
}

function setResultView(val: string) {
  removeClass(document.body, 'result-as-html');
  removeClass(document.body, 'result-as-src');
  removeClass(document.body, 'result-as-debug');
  addClass(document.body, 'result-as-' + val)
  defaults._view = val;
}
if (module.hot) {
  module.hot.accept()
}