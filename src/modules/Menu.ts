import Quill from 'quill'
const Module = Quill.import('core/module')
const KEYS = {
  SLASH: 191
}
class Menu extends Module {
  constructor(quill: Quill, options: any) {
    super(quill, options)

    this.quill = quill
    this.quill.keyboard.addBinding({ key: KEYS.SLASH }, this.onShowMenu.bind(this))
    document.addEventListener('click', this.onDocumentClick.bind(this))
    this.isShowBlockMenus_ = false
  }
  onShowMenu() {
    console.log('onShowMenu')
    this.isShowBlockMenus_ = true
  }
  hideMenu() {
    this.isShowBlockMenus = false
    console.log('onHideMenu')
  }
  onDocumentClick() {
    this.hideMenu()
  }
}

export default Menu
