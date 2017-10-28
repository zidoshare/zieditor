export default {
  pattern:/\s*\[TOC\]/,
  render:[{
    toc:function (items) {
      var html = '<div id="toc" class="toc"><ul class="toc-tree">';
      html += items;
      html += '</ul></div>';
      return html;
    }
  },{
    tocItem:function (id, level, text) {
      return '<li class="toc-item toc-level-' + level + '"><a class="toc-link" href="#' + id + '"><span class="toc-number"></span> <span class="toc-text">' + text + '</span></a></li>';
    }
  }]
}