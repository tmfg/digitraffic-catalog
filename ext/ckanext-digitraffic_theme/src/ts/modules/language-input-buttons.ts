import type * as ckan from "../ckan";
import { initialize } from "../module-constructs/module";

const LanguageButtons: ckan.Module<HTMLDivElement> = {
  initialize(this) {
    initialize.apply(this);

    const buttons = this._getButtons();
    buttons.children(".language-input-button").each((_index, element) => {
      const button = $(element);
      const buttonId = button.attr("id")

      button.on("click", (event) => {
        event.preventDefault();
        this.$(`#field-${buttonId}`).parent().parent().removeClass("hidden");
        button.hide();
      });
    });
  },

  _getButtons(): JQuery<HTMLElement> {
    return this.$(".language-input-buttons");
  },
};

ckan.module("digitraffic_theme_language_input_buttons", function ($) {
  return LanguageButtons;
});