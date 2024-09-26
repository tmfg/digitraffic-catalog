import type * as ckan from '../ckan'

ckan.module('digitraffic_theme_user_actions', function ($) {
  return {
    initialize: function () {
      $.proxyAll(this, /_on/);
      this._getMenuController().on('click', this._onMenuControllerClick);
      this._getMenuController().on('keydown', this._onMenuControllerKeyDown);
      this._getMenu().on('keydown', this._onMenuKeyDown)
    },
    _onMenuControllerClick: function(event) {
      console.log(event.target)
      console.log(this._getMenuController())
      if (event.target === this._getMenuController()[0]) {
        this._toggleList()
      }
    },
    _onMenuControllerKeyDown: function (event) {
      console.log('_onMenuControllerKeyDown user action')
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
      console.log('_focus user actions')
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
              const previousElement = menuElements.filter((index) => index < (menuElements.length-1) && menuElements[index + 1] === currentlyFocusedElement[0]);
              el = previousElement
            }
          } else {
            el = this._getMenu().find('a:first')
          }
          break
      }
      el.trigger('focus')
    },
    _toggleList: function() {
      console.log('_toggleList user action')
      if (this._isListOpen()) {
        this._closeList()
        this._focus('menuController')
      } else {
        this._openList()
        this._focus('first')
      }
    },
    _isListOpen: function(): boolean {
      const list = $("#user-action-list")
      return list.hasClass(this._expandedClass)
    },
    _closeList: function() {
      const button = $("#user-action-select")
      const list = $("#user-action-list")

      list.removeClass(this._expandedClass)
      button.attr("aria-expanded", "false")
    },
    _openList: function() {
      const button = $("#user-action-select")
      const list = $("#user-action-list")

      list.addClass(this._expandedClass)
      button.attr("aria-expanded", "true")
    },
    _getMenuController(): JQuery<HTMLButtonElement> {
      return $("#user-action-select")
    },
    _getMenu(): JQuery<HTMLUListElement> {
      return $("#user-action-list")
    }

  }
})