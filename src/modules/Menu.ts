import { constants } from 'os'
import Quill from 'quill'
const Module = Quill.import('core/module')
const KEYS = {
  SLASH: 191
}
const BLOCK_MENUS = [
  { name: 'H1', desc: 'Big section heading' },
  { name: 'H2', desc: 'Medium section heading' },
  { name: 'H3', desc: 'Small section heading' },
  { name: 'Order List', desc: 'Create a list with numbering' }
]
class Menu extends Module {
  constructor(quill: Quill, options: any) {
    super(quill, options)

    this.quill = quill
    this.quill.keyboard.addBinding({ key: KEYS.SLASH }, this.onShowMenu.bind(this))
    document.addEventListener('click', this.onDocumentClick.bind(this))
    this.isShowBlockMenus_ = false
  }
  onShowMenu() {
    // console.log('onShowMenu')
    this.isShowBlockMenus_ = true
    this.buildMenu()
  }
  buildMenu() {
    let container = document.createElement('div')
    container.id = 'quill-menu-module'
    container.className = 'absolute shadow-lg border w-72 z-50 bg-white'
    let html = `
    <p class="text-gray-500 p-2 border-b border-b-gray-200 text-sm">
      BASICK BLOCKS
    </p>
    <ul>`

    BLOCK_MENUS.forEach(item => {
      html += `<li
        class="
          px-4
          py-2
          flex
          h-16
          border-b border-b-gray-200
          hover:bg-gray-200
          cursor-pointer
        
        "
        data-name="${item.name}"
      >
        <div class="flex">
          <div
            class="
              w-12
              h-12
              text-center
              leading-10
              border border-gray-200
              rounded-lg
              overflow-hidden
            "
          >
          ${item.name}
          </div>
        </div>
        <div class="flex pl-2 flex-col">
          <div class="text-black flex text-sm">${item.name}</div>
          <div class="text-gray-400 flex text-sm">${item.desc}</div>
        </div>
      </li>
      `
    })

    html += `</ul>`
    container.innerHTML = html

    this.quill.root.parentElement.appendChild(container)

    this.repositionMenu(container)
    this.bindMenuEvens(container)
  }
  bindMenuEvens(menuEl: HTMLElement) {
    menuEl.addEventListener('click', e => {
      // console.log(e.target)
      //@ts-ignore
      let targetEl: HtmlElement = e.target
      console.log('a', targetEl)
      while (targetEl) {
        if (targetEl && targetEl.matches('li')) {
          let name = targetEl.dataset.name
          this.onClickMenu({ name })
          this.hideMenu()
          if (targetEl && targetEl.parentElement && targetEl.parentElement.matches('ul')) {
            e.stopPropagation()
            targetEl = null
            return
          }
        }
        targetEl = targetEl.parentElement
      }
    })
  }
  onClickMenu(item: { name: string }) {
    let editor = this.quill
    switch (item.name) {
      case 'H1':
        editor.format('header', 'h1')
        break
      case 'H2':
        editor.format('header', 'h2')
        break
      case 'H3':
        editor.format('header', 'h3')
        break
      case 'Order List':
        editor.format('list', 'ordered')
        break
      default:
        break
    }
  }
  repositionMenu(menuEl: HTMLElement) {
    const bounds = this.quill.getBounds(this.quill.getSelection().index)
    menuEl.style.left = bounds.left + 'px'
    menuEl.style.top = bounds.top + bounds.height + 10 + 'px'
    // debugger;
  }
  hideMenu() {
    this.isShowBlockMenus = false
    document.getElementById('quill-menu-module')?.remove()
    // console.log('onHideMenu')
  }
  onDocumentClick() {
    this.hideMenu()
  }
}

export default Menu
