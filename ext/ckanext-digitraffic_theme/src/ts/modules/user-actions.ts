import { Dropdown } from "../module-constructs/dropdown";

const UserActions: ckan.Module<HTMLElement> = {
  ...Dropdown(),
  _getMenuController(): JQuery<HTMLButtonElement> {
    return $("#user-action-select")
  },
  _getMenu(): JQuery<HTMLUListElement> {
    return $("#user-action-list")
  }
}

ckan.module('digitraffic_theme_user_actions', function ($) { return UserActions})