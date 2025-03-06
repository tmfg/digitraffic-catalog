import { initialize } from "../module-constructs/module";

/**
 * CKAN has a select-switch module (https://github.com/ckan/ckan/blob/master/ckan/public/base/javascript/modules/select-switch.js)
 * that does not work well with Windows Chrome keyboard navigation. This module is basically the same as select-switch
 * but tries to make sure that the change event is fired only when user means it.
 */
export const SelectSwitch = {
  initialize(this) {
    initialize.apply(this);
    this.el.on('keyup', 'select', (event) => {
      const key = event.key;
      const pickerOpenerKeys = new Set(['ArrowDown', 'ArrowUp', "Space"])
      const isPickerOpenerPressed = pickerOpenerKeys.has(key)
      const isShowPickerSupported = "showPicker" in HTMLSelectElement.prototype
      // Most popular browsers supports 'showPicker'. We want to always show the picker when pickerOpenerKeys are
      // pressed. This isn't the default behavior in all browsers on all OSes. For instance, Chrome on Windows default
      // behavior is to not show the picker when arrows are used. Instead, the next option is selected and change event
      // dispatched.
      if (isPickerOpenerPressed && isShowPickerSupported) {
        event.preventDefault();
        event.target.showPicker();
      }
    });
    this.el.on('change', 'select', (event) => {
      this.el.submit()
    });
  }
} as ckan.Module<HTMLFormElement>

ckan.module('digitraffic_theme_select_switch', function ($) { return SelectSwitch})