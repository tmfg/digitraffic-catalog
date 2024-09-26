import type * as ckan from '../ckan'

ckan.module('digitraffic_theme_app_navigation', function ($) {
  return {
    initialize: function () {
      $.proxyAll(this, /_on/);
      this._getMenuController().on('click', this._onMenuControllerClick);
      this._getMenuController().on('keydown', this._onMenuControllerKeyDown);
      this._getMenu().on('keydown', this._onMenuKeyDown)
    },
    _onMenuControllerClick: function(event) {
      if (event.target === this._getMenuController()[0]) {
        this._toggleList()
      }
    },
    _onMenuControllerKeyDown: function (event) {
      if (event.target === this._getMenuController()[0]) {
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
    _onMenuKeyDown: function(event) {
      console.log('_onMenuControllerKeyDown app navigation')
      console.log(event.target)
      console.log(this._getMenu())
      console.log(this._getMenu().has(event.target))
      if (this._getMenuController().is(':visible') && this._getMenu().has(event.target)) {
        const {key} = event
        switch (key) {
          case 'Escape':
            event.preventDefault()
            this._closeList()
            this._focus('menuController')
            break
          case 'ArrowDown':
            event.preventDefault()
            this._focus('next')
            break
          case 'ArrowUp':
            event.preventDefault()
            this._focus('previous')
        }
      }

    },
    _expandedClass: "expanded",
    _focus: function (elementKey: 'first'|'menuController'|'next'|'previous') {
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
              console.log('next')
              console.log(menuElements)
              console.log(currentlyFocusedElement)
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
              console.log('prev')
              console.log(menuElements)
              console.log(currentlyFocusedElement)
              const previousElement = menuElements.filter((index) => index < (menuElements.length-1) && menuElements[index + 1] === currentlyFocusedElement[0]);
              el = previousElement
            }
          } else {
            el = this._getMenu().find('a:first')
          }
          break
      }
      console.log('EL to focus')
      console.log(el)
      el.trigger('focus')
    },
    _toggleList: function() {
      if (this._isMenuOpen()) {
        this._closeList()
        this._focus('menuController')
      } else {
        this._openList()
        this._focus('first')
      }
    },
    _isMenuOpen: function(): boolean {
      const menu = this._getMenu()
      return menu.hasClass(this._expandedClass)
    },
    _closeList: function() {
      const menuController = this._getMenuController()
      const menu = this._getMenu()

      menu.removeClass(this._expandedClass)
      menuController.attr("aria-expanded", "false")
    },
    _openList: function() {
      const menuController = this._getMenuController()
      const menu = this._getMenu()

      menu.addClass(this._expandedClass)
      menuController.attr("aria-expanded", "true")
    },
    _getMenuController(): JQuery<HTMLElement> {
      return $("#app-nav-hamburger-button")
    },
    _getMenu(): JQuery<HTMLUListElement> {
      return $("#nav-interactions-wrapper")
    }

  }
})