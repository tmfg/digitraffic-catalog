import { initialize } from "../module-constructs/module";
import {
  type FdsDropdown,
  type FdsDropdownOption,
} from "@fintraffic/fds-coreui-components/dist/dropdown";
// Import for the side effect of web component getting defined
import "@fintraffic/fds-coreui-components/dist/define/fds-dropdown";

type MultiselectMO = {
  _getOptions: () => FdsDropdownOption<string>[];
}

const MultiSelect: ckan.Module<FdsDropdown<string>, MultiselectMO>  = {
  initialize() {
    initialize.apply(this);
    const options = this._getOptions();
    console.log(options);
    customElements.whenDefined("fds-dropdown").then(() => {
      const fdsMultiSelect = document.createElement(
        "fds-dropdown"
      ) as FdsDropdown<string>;

      fdsMultiSelect.options = options
      fdsMultiSelect.multiple = true

      this.el.replaceWith(fdsMultiSelect);
    });
  },
  _getOptions(): FdsDropdownOption<string>[] {
    const optionElements = this.$("option");
    return optionElements.toArray()
      .map((element: HTMLOptionElement) => {
        return {
            label: element.textContent?.trim(),
            value: element.value,
        };
    })
  },
};

ckan.module('digitraffic_theme_multi_select', MultiSelect)