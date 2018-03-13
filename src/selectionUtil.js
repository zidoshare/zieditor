export default {
  getSelection: function () {
    if (window.getSelection) {
      /*主流的浏览器，包括chrome、Mozilla、Safari*/
      return window.getSelection()
    } else if (document.selection) {
      /*IE下的处理*/
      return document.selection.createRange()
    }
    return null
  },
  getRange: function (selection) {

    if (window.getSelection) {

      /*主流的浏览器，包括chrome、Mozilla、Safari*/

      var sel = selection || window.getSelection()

      if (sel.rangeCount > 0) {

        return sel.getRangeAt(0)

      }

    } else if (document.selection) {

      /*IE下的处理*/
      var sel = selection || document.selection
      return sel.createRange()

    }
    return null
  },
  toTextEnd: function (elem) {
    if (window.getSelection) {
      elem.setSelectionRange(elem.value.length, elem.value.length)
      elem.focus()
    } else if (document.selection) {
      /*IE下*/
      var range = elem.createTextRange()
      range.moveStart('character', elem.value.length)
      range.collapse(true)
      range.select()
    }
  },
  createRange: function () {
    if(window.getSelection){
      return document.createRange()
    }else {
      return document.body.createTextRange()
    }
  }
}