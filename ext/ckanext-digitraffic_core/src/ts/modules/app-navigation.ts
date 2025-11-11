import {Dropdown, type DropdownMO} from "../module-constructs/dropdown";

const AppNavigation: ckan.Module<HTMLDivElement, DropdownMO> = {
  ...Dropdown<HTMLDivElement>(),
  _getMenuController(): JQuery<HTMLButtonElement> {
    return $("#app-nav-hamburger-button")
  },

  _getMenu(): JQuery<HTMLDivElement> {
    return $("#nav-interactions-wrapper")
  }
}

ckan.module('digitraffic_core_app_navigation', AppNavigation)