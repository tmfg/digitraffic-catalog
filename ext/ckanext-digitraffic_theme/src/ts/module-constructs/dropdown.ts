import { initialize } from "./module";

export const Dropdown = <T extends HTMLElement>(): ckan.Module<T> => ({
  initialize(this) {
    initialize.apply(this);
    this._getMenuController().on('click', this._onMenuControllerClick);
    this._getMenuController().on('keydown', this._onMenuControllerKeyDown);
    this._getMenu().on('keydown', this._onMenuKeyDown)
  },

  _onMenuControllerClick(event: JQuery.ClickEvent) {
    if (this._getMenuController().has(event.target)) {
      this._toggleList()
    }
  },

  _onMenuControllerKeyDown(event: JQuery.KeyDownEvent) {
    if (this._getMenuController().has(event.target)) {
      const {key} = event
      switch (key) {
        case ' ':
        case 'Enter':
          event.preventDefault()
          this._toggleList()
          break
        case 'ArrowDown':
          event.preventDefault()
          this._focus('first')
          break
      }
    }
  },

  _onMenuKeyDown(event: JQuery.KeyDownEvent) {
    if (this._getMenuController().is(':visible') && this._getMenu().has(event.target)) {
      const {key} = event
      switch (key) {
        case 'Escape':
          event.preventDefault()
          this._closeList()
          this._focus('menuController')
          break
        case 'ArrowDown':
          if (!$(event.target).is('select')) {
            event.preventDefault()
            this._focus('next')
          }
          break
        case 'ArrowUp':
          if (!$(event.target).is('select')) {
            event.preventDefault()
            this._focus('previous')
          }
          break
      }
    }

  },

  _expandedClass: "expanded",

  _focus(elementKey: 'first' | 'menuController' | 'next' | 'previous') {
    let el
    const currentlyFocusedElement = this.el.find(':focus')
    const isFocusOnMenu = !!this._getMenu().has(currentlyFocusedElement)
    const isFocusOnLastMenuItem = isFocusOnMenu && this._getMenu().find('a:last')[0] === currentlyFocusedElement[0]
    const isFocusOnFirstMenuItem = isFocusOnMenu && this._getMenu().find('a:first')[0] === currentlyFocusedElement[0]

    switch (elementKey) {
      case "first":
        el = this._getMenu().find('a:first')
        break
      case "menuController":
        el = this._getMenuController()
        break
      case "next":
        if (isFocusOnMenu) {
          if (isFocusOnLastMenuItem) {
            return
          } else {
            const menuElements = this._getMenu().find('a');
            const nextElement = menuElements.filter((index) => index > 0 && menuElements[index - 1] === currentlyFocusedElement[0]);
            el = nextElement
          }
        } else {
          el = this._getMenu().find('a:first')
        }
        break
      case "previous":
        if (isFocusOnMenu) {
          if (isFocusOnFirstMenuItem) {
            return
          } else {
            const menuElements = this._getMenu().find('a');
            const previousElement = menuElements.filter((index) => index < (menuElements.length - 1) && menuElements[index + 1] === currentlyFocusedElement[0]);
            el = previousElement
          }
        } else {
          el = this._getMenu().find('a:first')
        }
        break
    }
    el.trigger('focus')
  },

  _toggleList() {
    if (this._isMenuOpen()) {
      this._closeList()
      this._focus('menuController')
    } else {
      this._openList()
      this._focus('first')
    }
  },

  _isMenuOpen(): boolean {
    const menu = this._getMenu()
    return menu.hasClass(this._expandedClass)
  },

  _closeList() {
    const menuController = this._getMenuController()
    const menu = this._getMenu()

    menu.removeClass(this._expandedClass)
    menuController.attr("aria-expanded", "false")
  },

  _openList() {
    const menuController = this._getMenuController()
    const menu = this._getMenu()

    menu.addClass(this._expandedClass)
    menuController.attr("aria-expanded", "true")
  },

  _getMenuController(): JQuery<HTMLElement> {
    throw Error('No controller')
  },

  _getMenu(): JQuery<HTMLElement> {
    throw Error('No menu')
  }
} as unknown as ckan.Module<T>)