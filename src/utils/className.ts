let spaceRegexp = /\s/g;
let breakRegexp = /[\t\r\n]/g;
export function hasClass(elem: HTMLElement, cls: string): boolean {
  cls = cls || '';
  if (cls.replace(spaceRegexp, '').length == 0)
    return false;
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

export function addClass(elem: HTMLElement, cls: string) {
  if (!hasClass(elem, cls)) {
    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
  }
}

export function removeClass(elem: HTMLElement, cls: string) {
  if (hasClass(elem, cls)) {
    let newClass = ' ' + elem.className.replace(breakRegexp, '') + ' '
  }
}