import { initialize } from "../module-constructs/module";

type SelectSwitchMO = {
}

/**
 * CKAN has a select-switch module (https://github.com/ckan/ckan/blob/master/ckan/public/base/javascript/modules/select-switch.js)
 * that does not work well with Windows Chrome keyboard navigation. This module is basically the same as select-switch
 * but tries to make sure that the change event is fired only when user means it.
 */
export const SelectSwitch: ckan.Module<HTMLFormElement, SelectSwitchMO> = {
  initialize() {
    initialize.apply(this);
    // @ts-ignore
    this.el.on('keyup', 'select', (event: KeyboardEvent) => {
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
        if (event.target instanceof HTMLSelectElement) {
          event.target.showPicker();
        }
      }
    });
    this.el.on('change', 'select', () => {
      this.el.submit()
    });
  }
}

ckan.module('digitraffic_core_select_switch', SelectSwitch)