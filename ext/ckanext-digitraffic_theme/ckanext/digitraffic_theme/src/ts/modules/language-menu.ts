import type * as ckan from "../ckan";

ckan.module("digitraffic_theme_language_menu", function ($) {
  return {
    initialize: function () {
      const customDropdown = document.querySelector(
        ".custom-language-dropdown"
      );
      const customOptions = document.querySelectorAll(
        ".custom-language-option"
      );
      const hiddenInput = document.getElementById(
        "language-option-hidden"
      ) as HTMLInputElement;
      const form = document.querySelector(".lang-select") as HTMLFormElement;
      if (customDropdown) {
        customDropdown.addEventListener("click", function (e) {
          const target = e.currentTarget as HTMLElement;
          target.classList.toggle("open");
        });
      }

      customOptions.forEach(function (option) {
        option.addEventListener("click", function (e) {
          e.stopPropagation();
          const value = option.getAttribute("data-value");
          if (hiddenInput && value) {
            hiddenInput.value = value;
          }
          if (form) {
            form.submit();
          }
        });
      });

      document.addEventListener("click", function (e) {
        if (customDropdown && !customDropdown.contains(e.target as Node)) {
          customDropdown.classList.remove("open");
        }
      });
    },
  };
});
