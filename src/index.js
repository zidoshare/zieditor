import merge from './helpers/merge'
var Remarkable = require('remarkable')
var CodeMirror = require('codemirror')
require('codemirror/addon/mode/overlay.js')
require('codemirror/addon/edit/continuelist.js')
require('codemirror/mode/markdown/markdown.js')
require('codemirror/mode/gfm/gfm.js')
import 'codemirror/lib/codemirror.css'

var _defaults = {
  commonmark: false,
  html: false,        // Enable HTML tags in source
  xhtmlOut: false,        // Use '/' to close single tags (<br />)
  breaks: false,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-',  // CSS language prefix for fenced blocks
  linkify: true,         // autoconvert URL-like texts to links
  linkTarget: '',           // set target to open link in
  typographer: true,         // Enable smartypants and other sweet transforms

  _highlight: true,
  _strict: false,
  _view: 'html'               // html / src / debug
}

//加载highlight.js
_defaults.highlight = function (str, lang) {
  if (!defaults._highlight || !window.hljs) {
    return ''
  }
  var hljs = window.hljs
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

function zieditor(opt) {

  opt = merge({}, _defaults, opt)

  var mdHtml, mdSrc

  if (opt._strict) {
    mdHtml = new Remarkable('commonmark')
    mdSrc = new Remarkable('commonmark')
  } else {
    mdHtml = new Remarkable('full', opt)
    mdSrc = new Remarkable('full', opt)
  }
  mdHtml.renderer.rules.paragraph_open = function (tokens, idx) {
    var line
    if (tokens[idx].lines && tokens[idx].level === 0) {
      line = tokens[idx].line[0]
      return '<p class="line" data-line="' + line + '">'
    }
    return '<p>'
  }

  mdHtml.renderer.rules.heading_open = function (tokens, idx) {
    var line
    if (tokens[idx].lines && tokens[idx].level === 0) {
      line = tokens[idx].line[0]
      return '<h' + tokens[idx].hLevel + ' class="line" data-line="' + line + '">'
    }
    return '<h' + tokens[idx].hLevel + '>'
  }
  this.cm = null
}
/**
 * set all container,it will create textarea as source and append a div as preview(if preview is true)
 * @param {HTMLElement} el the all container
 */
zieditor.prototype.from = function (el) {
  var textarea = document.createElement('textarea')
  this.textarea = textarea

  el.innerHTML = ''
  el.appendChild(textarea)
  this.cm = CodeMirror.fromTextArea(textarea)

  var previewNode = document.createElement('div')
  el.appendChild(previewNode)
  this.previewNode = previewNode
}

zieditor.prototype.destroyed = function (el) {
  this.cm.toTextArea()
  this.textarea.remove()
  this.previewNode.remove()
}

export default zieditor