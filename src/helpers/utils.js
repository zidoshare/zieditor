var util = {
  clientSize: function (node) {
    node = node || document.body
    return {
      w: node.clientWidth,
      h: node.clientHeight,
    }
  },
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler)
    } else {
      element['on' + type] = handler
    }
  },
  getEvent: function (event) {
    return event ? event : window.event
  },
  getDOMFromEvent: function (event) {
    return event.target
  },
}

export default util