import { Dropdown } from "../module-constructs/dropdown";

const AppNavigation: ckan.Module<HTMLDivElement> = {
  ...Dropdown<HTMLDivElement>(),
  _getMenuController(): JQuery<HTMLButtonElement> {
    return $("#app-nav-hamburger-button")
  },

  _getMenu(): JQuery<HTMLDivElement> {
    return $("#nav-interactions-wrapper")
  }
}

ckan.module('digitraffic_theme_app_navigation', function ($) { return AppNavigation})