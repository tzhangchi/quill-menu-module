import Quill from 'quill'
const Module = Quill.import('core/module')
const KEYS = {
  SLASH: 191
}
const BLOCK_MENUS = [
  { name: 'H1', desc: 'Just Writing Desc' },
  { name: 'H2', desc: 'Just Writing Desc' },
  { name: 'H3', desc: 'Just Writing Desc' },
  { name: 'Code', desc: 'Just Writing Desc' }
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
    console.log('onShowMenu')
    this.isShowBlockMenus_ = true
    this.buildMenu()
  }
  buildMenu() {
    let container = document.createElement('div')
    container.id = 'quill-menu-module'
    let html = `<div
    class="fixed top-14 left-4 shadow-lg border w-64 z-50 bg-white"
  >
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
        @click="onClickMenu(item)"
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
    document.body.appendChild(container)
  }
  hideMenu() {
    this.isShowBlockMenus = false
    document.getElementById('quill-menu-module')?.remove()
    console.log('onHideMenu')
  }
  onDocumentClick() {
    this.hideMenu()
  }
}

export default Menu
