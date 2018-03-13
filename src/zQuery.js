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
  console.log(arguments)
  for (var i = 0; i < arguments.length; i++) {
    var classes = className.split(' ')
    for (var j = 0; j < classes.length; j++) {
      if (classes[j] == arguments[i]) {
        classes = classes.splice(j, 1)
      }
    }
    className = classes.join(' ') + ' ' + arguments[i]
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