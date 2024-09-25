import type * as ckan from '../ckan'

ckan.module('digitraffic_theme_user_actions', function ($) {
  return {
    initialize: function () {
      $.proxyAll(this, /_on/);
      this.el.on('click', this._onClick);
    },
    _onClick: function(event) {
      console.log(this)
      if (this._isListOpen()) {
        this._closeList()
      } else {
        this._openList()
      }
    },
    _expandedClass: "expanded",
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
    }
  }
})