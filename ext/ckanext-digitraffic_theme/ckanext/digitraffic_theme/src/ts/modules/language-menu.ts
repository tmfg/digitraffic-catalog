import type * as ckan from "../ckan";
import { initialize } from "../module-constructs/module";

const LanguageMenu: ckan.Module<HTMLDivElement> = {
  initialize(this) {
    initialize.apply(this);
    const form = this._getForm();
    const formInput = this._getFormInput();
    const languageDropdown = this._getLanguageDropdown();
    const languageOptions = this._getLanguageOptions();

    languageDropdown.on("click", this._toggleLanguageDropdownMouseOpen);
    languageDropdown.on("keydown", this._toggleLanguageDropdownKeyboardOpen);

    languageOptions.each((_index: number, element: JQuery<HTMLElement>) => {
      const option = $(element);
      option.on("click", () => this._submitFormMouse(option, formInput, form));
      option.on("keydown", (e: JQuery.TriggeredEvent) =>
        this._submitFormKeyboard(e, option, formInput, form)
      );
    });
  },

  _toggleLanguageDropdownMouseOpen(e: JQuery.TriggeredEvent) {
    if (e.target) {
      (e.target as HTMLElement).classList.toggle("open");
    }
  },
  _toggleLanguageDropdownKeyboardOpen(e: JQuery.TriggeredEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.target) {
        (e.target as HTMLElement).classList.toggle("open");
      }
    }
  },

  _submitFormMouse(
    languageOption: JQuery<HTMLElement>,
    formInput: JQuery<HTMLElement>,
    form: JQuery<HTMLFormElement>
  ) {
    const value = languageOption.attr("data-value");
    if (formInput && value) {
      formInput.val(value);
    }
    if (form) {
      form.trigger("submit");
    }
  },

  _submitFormKeyboard(
    event: JQuery.TriggeredEvent,
    languageOption: JQuery<HTMLElement>,
    formInput: JQuery<HTMLElement>,
    form: JQuery<HTMLFormElement>
  ) {
    if (event.key === "Enter" || event.key === " ") {
      const value = languageOption.attr("data-value");
      if (formInput && value) {
        formInput.val(value);
      }
      if (form) {
        form.trigger("submit");
      }
    }
  },

  _getForm(): JQuery<HTMLElement> {
    return this.$("#language-menu-form");
  },
  _getFormInput(): JQuery<HTMLElement> {
    return this.$("#language-option-hidden");
  },
  _getLanguageDropdown(): JQuery<HTMLElement> {
    return this.$(".custom-language-dropdown");
  },
  _getLanguageOptions(): JQuery<HTMLElement> {
    return this.$(".custom-language-option");
  },
};

ckan.module("digitraffic_theme_language_menu", function ($) {
  return LanguageMenu;
});
