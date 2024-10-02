import { Dropdown } from "../module-constructs/dropdown";

const AppNavigation: ckan.Module = {
  ...Dropdown,
  _getMenuController(): JQuery<HTMLElement> {
    return $("#app-nav-hamburger-button")
  },

  _getMenu(): JQuery<HTMLElement> {
    return $("#nav-interactions-wrapper")
  }
}

ckan.module('digitraffic_theme_app_navigation', function ($) { return AppNavigation})