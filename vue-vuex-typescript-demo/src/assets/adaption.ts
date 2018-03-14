class Adaption {
  viewportElement: any
  styleElement: any
  designWidth = 750
  defaultFontSize = 14
  constructor () {
    window.addEventListener.call(this,'resize',() => this.resize())
  }
  resize () {
    let dpr = window.devicePixelRatio
    let scale = window.screen.width / this.designWidth
    let size = this.defaultFontSize / (this.designWidth / (window.screen.width * dpr))
    if (window.screen.width > this.designWidth) return this
    let head = document.getElementsByTagName('head')

    this.removeElement(this.viewportElement)
    this.removeElement(this.styleElement)

    this.viewportElement = document.createElement('meta')
    this.styleElement = document.createElement('style')

    this.viewportElement.name = 'viewport'
    this.viewportElement.setAttribute('content', 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no,width=device-width')
    // styleElement.innerHTML = 'html{ font-size:'+ size +'px; }';
    // window.document.documentElement.style.fontSize = size +'px';
    // prependChild( head[0] , styleElement);
    this.prependChild(head[0], this.viewportElement)

  }

  removeElement (_element: any) {
    if (!_element) return this
    let _parentElement = _element.parentNode
    if (_parentElement) {
      _parentElement.removeChild(_element)
    }
  }

  prependChild (parent: any , newChild: any) {
    if (parent.firstChild) {
      parent.insertBefore(newChild, parent.firstChild)
    } else {
      parent.appendChild(newChild)
    }
    return parent
  }
}

export default new Adaption()
