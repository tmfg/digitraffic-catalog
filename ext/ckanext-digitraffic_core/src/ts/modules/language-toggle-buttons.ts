import { initialize } from "../module-constructs/module";

type LanguageToggleButtonsMO = {
  _getToggleButtons: () => JQuery<HTMLElement>;
  _getCloseButtons: () => JQuery<HTMLElement>;
}

const LanguageToggleButtons: ckan.Module<HTMLElement, LanguageToggleButtonsMO> = {
  initialize(this) {
    initialize.apply(this);

    const toggleButtons = this._getToggleButtons();
    toggleButtons.children(".language-toggle-button").each((_index, element) => {
      const button = $(element);
      const buttonId = button.attr("id");

      // toggle visibility of input field when language toggle button is clicked
      button.on("click", (event) => {
        event.preventDefault();
        const inputField = this.$(`#field-${buttonId}`);
        inputField.parent().parent().removeClass("hidden");
        button.addClass("hidden");
      });
    });

    const closeButtons = this._getCloseButtons();
    closeButtons.each((_index, element) => {
      const button = $(element);
      const buttonId = button.attr("id");

      // hide input field when related close button is clicked 
      button.on("click", (event) => {
        event.preventDefault();
        const toggleButton = $(`#${buttonId}.language-toggle-button`);
        toggleButton.removeClass("hidden");
        button.parent().parent().addClass("hidden");
        const inputField = this.$(`#field-${buttonId}`);
        // clear value of input field when button is clicked and field is hidden
        inputField.val("");
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


ckan.module("digitraffic_core_language_toggle_buttons", LanguageToggleButtons);