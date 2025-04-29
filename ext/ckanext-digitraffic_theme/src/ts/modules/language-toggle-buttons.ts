import type * as ckan from "../ckan";
import { initialize } from "../module-constructs/module";

const LanguageToggleButtons: ckan.Module<HTMLDivElement> = {
  initialize(this) {
    initialize.apply(this);

    const toggleButtons = this._getToggleButtons();
    toggleButtons.children(".language-toggle-button").each((_index, element) => {
      const button = $(element);
      const buttonId = button.attr("id")

      button.on("click", (event) => {
        event.preventDefault();
        const inputField = this.$(`#field-${buttonId}`)
        inputField.parent().parent().removeClass("hidden");
        button.hide();
      });
    });

    const closeButtons = this._getCloseButtons();
    closeButtons.each((_index, element) => { 
      const button = $(element);
      const buttonId = button.attr("id")
      
      button.on("click", (event) => {
        event.preventDefault();
        const toggleButton = $(`#${buttonId}.language-toggle-button`)
        toggleButton.show();
        button.parent().parent().addClass("hidden");
      });
       
  });

  },

_getToggleButtons(): JQuery<HTMLElement> {
    return this.$(".language-toggle-buttons");
  },

_getCloseButtons(): JQuery<HTMLElement> {
  return this.$(".hide-language-input");
  },

};


ckan.module("digitraffic_theme_language_toggle_buttons", function ($) {
  return LanguageToggleButtons;
});