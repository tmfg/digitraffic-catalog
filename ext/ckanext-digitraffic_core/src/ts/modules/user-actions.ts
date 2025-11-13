import {Dropdown, type DropdownMO} from "../module-constructs/dropdown";

const UserActions: ckan.Module<HTMLElement, DropdownMO> = {
  ...Dropdown(),
  _getMenuController(): JQuery<HTMLButtonElement> {
    return $("#user-action-select")
  },
  _getMenu(): JQuery<HTMLUListElement> {
    return $("#user-action-list")
  }
}

ckan.module('digitraffic_core_user_actions', UserActions)