import type * as ckan from "../ckan";

ckan.module("digitraffic_theme_language_menu", function ($) {
  return {
    initialize: function () {
      const languageDropdown = document.querySelector(
        ".custom-language-dropdown"
      );
      const languageOptions = document.querySelectorAll(
        ".custom-language-option"
      );
      const formInput = document.getElementById(
        "language-option-hidden"
      ) as HTMLInputElement;
      const form = document.querySelector(".lang-select") as HTMLFormElement;

      if (languageDropdown) {
        languageDropdown.addEventListener("click", function (e) {
          languageDropdown.classList.toggle("open");
        });
        languageDropdown.addEventListener("keydown", function (e) {
          if (
            e instanceof KeyboardEvent &&
            (e.key === "Enter" || e.key === " ")
          ) {
            e.preventDefault();
            languageDropdown.classList.toggle("open");
          }
        });
      }

      languageOptions.forEach(function (option) {
        option.addEventListener("click", function (e) {
          const value = option.getAttribute("data-value");
          if (formInput && value) {
            formInput.value = value;
          }
          if (form) {
            form.submit();
          }
        });
        option.addEventListener("keydown", function (e) {
          if (
            e instanceof KeyboardEvent &&
            (e.key === "Enter" || e.key === " ")
          ) {
            const value = option.getAttribute("data-value");
            if (formInput && value) {
              formInput.value = value;
            }
            if (form) {
              form.submit();
            }
          }
        });
      });
    },
  };
});
