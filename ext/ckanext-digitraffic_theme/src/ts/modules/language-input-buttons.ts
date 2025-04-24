import type * as ckan from "../ckan";
import { initialize } from "../module-constructs/module";

const LanguageButtons: ckan.Module<HTMLDivElement> = {
  initialize(this) {
    initialize.apply(this);

    const openButtons = this._getOpenButtons();
    openButtons.children(".language-input-button").each((_index, element) => {
      const button = $(element);
      const buttonId = button.attr("id")

      button.on("click", (event) => {
        event.preventDefault();
        this.$(`#field-${buttonId}`).parent().parent().removeClass("hidden");
        button.hide();
      });
    });

    const closeButtons = this._getCloseButtons();
    closeButtons.each((_index, element) => { 
      const button = $(element);
      const buttonId = button.attr("id")
      button.on("click", (event) => {
        event.preventDefault();
        const openButton = $(`#${buttonId}.language-input-button`)
        openButton.show();
        button.parent().parent().addClass("hidden");
      });
       
  });

  },

_getOpenButtons(): JQuery<HTMLElement> {
    return this.$(".language-input-buttons");
  },

_getCloseButtons(): JQuery<HTMLElement> {
  return this.$(".hide-language-input");
  },

};


ckan.module("digitraffic_theme_language_input_buttons", function ($) {
  return LanguageButtons;
});