import * as hljs from 'highlight.js';
import * as Remarkable from 'remarkable';
import { addClass, hasClass, removeClass } from './utils/className';
let mdHtml: Remarkable, mdSrc: Remarkable, permallink, scrollMap;
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
function mdInit() {
  if (defaults._strict) {
    mdHtml = new Remarkable('commonmark');
    mdSrc = new Remarkable('commonmark');
  } else {
    mdHtml = new Remarkable('full', defaults);
    mdSrc = new Remarkable('full', defaults);
  }
  mdHtml.renderer.rules.table_open = function () {
    return '<table class="table table-striped">\n';
  };
  mdHtml.renderer.rules.paragraph_open = function (tokens: Remarkable.Token[], idx: number): string {
    let line: number;
    const lines = tokens[idx].lines;
    if (lines && tokens[idx].level === 0) {
      line = lines[0];
      return `<p class="line" data-line="${line}">`;
    }
    return '<p>';
  };

  mdHtml.renderer.rules.heading_open=function(tokens:Remarkable.Token[],idx:number):string{
    let line;
    const lines = tokens[idx].lines;
    if( lines && tokens[idx].level === 0){
      line = lines[0]
      return `<h${tokens[idx].hLevel} class="line" data-line="${line}"`;
    }
    return `<h${tokens[idx].hLevel}>`;
  };
}

function setHighlightedContent(selector,content,lang){
  
}
if (module.hot) {
  module.hot.accept()
}
