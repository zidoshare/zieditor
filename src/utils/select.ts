
interface Valable {
  value: string
}

export class SDom {
  doms: Element[];
  constructor(str: string) {
    if (!str) {
      return
    }
    if (str.substring(0, 1) === '#') {
      let elem = document.getElementById(str.substring(1));
      if (elem)
        this.doms.push(elem);
    } else if (str.substring(0, 1) == '.') {
      let elems = document.getElementsByTagName('*');
      let reg = new RegExp("(^|\\s)" + str.substring(1) + "($|\\s)");
      for (let i = 0; i < elems.length; i++) {
        if (reg.test(elems[i].className.substring(1))) {
          this.doms.push(elems[i])
        }
      }
    } else {
      let elems = document.getElementsByTagName(str);
      for (let i = 0; i < elems.length; i++) {
        this.doms.push(elems[i]);
      }
    }
  }
  html(str: string): SDom {
    if (this.doms.length == 0) {
      return this;
    }
    this.doms.forEach(dom => {
      dom.innerHTML = str
    })
    return this;
  }
  text(str: string): SDom {
    if (this.doms.length == 0) {
      return this;
    }
    this.doms.forEach(dom => {
      if (dom instanceof HTMLElement) {
        dom.innerText = str
      }
    })
    return this;
  }
  val(): string {
    if (this.doms.length == 0) {
      return '';
    }
    return this.doms.map(dom => {
      if(dom instanceof HTMLInputElement){
        return dom.value;
      }
      return '';
    }).join();
  }
  css(prop:string):string{
    if(this.doms.length == 0){
      return '';
    }
    let dom = this.doms[0]
    if(dom instanceof HTMLElement){
      return dom.style[prop] + 'px';
    }
    return '';
  }
  dom():HTMLElement{
    return <HTMLElement>this.doms[0]
  }
}

export default function select(str: string) {
  return new SDom(str);
}