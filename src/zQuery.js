var isDOM = (typeof HTMLElement === 'object') ?
  function (obj) {
    return obj instanceof HTMLElement;
  } :
  function (obj) {
    return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
  }

function ZDom(dom) {
  this.node = dom
}

ZDom.prototype.appendClass = function () {
  var className = this.node.className || ''
  for (var i = 0; i < arguments.length; i++) {
    var newClassArr = []
    var classes = className.split(' ')
    for (var j = 0; j < classes.length; j++) {
      if (classes[j].replace(/ /g,'') != arguments[i].replace(/ /g,'')) {
        newClassArr.push(classes[j].replace(/ /g,''))
      }
    }
    className = newClassArr.join(' ') + ' ' + arguments[i]
  }
  this.node.className = className
  return this
}

ZDom.prototype.removeClass = function () {
  var className = this.node.className || ''
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'string') {
      if (className == arguments[i]) {
        className = ''
      } else {
        className = className.replace(' ' + arguments[i]).replace(arguments[i] + ' ')
      }
    }
  }
  this.node.className = className
  return this
}
ZDom.prototype.text = function () {
  return this.node.innerText
}

function $(el) {
  if (isDOM(el)) {
    return new ZDom(el)
  }
}


export default $