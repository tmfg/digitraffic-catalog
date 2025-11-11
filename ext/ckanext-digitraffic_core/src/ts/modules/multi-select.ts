import { initialize } from "../module-constructs/module";
import {
  type FdsDropdown,
  type FdsDropdownOption,
} from "@fintraffic/fds-coreui-components/dist/dropdown";
// Import for the side effect of web component getting defined
import "@fintraffic/fds-coreui-components/dist/define/fds-dropdown";

type OptionValues = FdsDropdownOption<string> & {selected: boolean};

type MultiselectMO = {
  _getOptionValues: () => OptionValues[];
  _optionValuesToFdsDropdownOptions: (optionValues: OptionValues[]) => FdsDropdownOption<string>[];
}

const MultiSelect: ckan.Module<FdsDropdown<string>, MultiselectMO>  = {
  initialize() {
    initialize.apply(this);
    const options = this._getOptionValues();
    customElements.whenDefined("fds-dropdown").then(() => {
      const fdsMultiSelect = document.createElement(
        "fds-dropdown"
      ) as FdsDropdown<string>;

      fdsMultiSelect.options = this._optionValuesToFdsDropdownOptions(options)
      fdsMultiSelect.value = this._optionValuesToFdsDropdownOptions(
        options.filter((option) => option.selected)
      )
      fdsMultiSelect.multiple = true
      fdsMultiSelect.setAttribute('id', this.el[0].id)
      if (this.el[0].name) {
        fdsMultiSelect.setAttribute('name', this.el[0].name)
      }

      this.el.replaceWith(fdsMultiSelect);
    });
  },
  _getOptionValues(): OptionValues[] {
    const optionElements = this.$<HTMLOptionElement>("option");
    return optionElements.toArray()
      .map((element) => {
        if (element.textContent === null) {
            throw new Error("Option element does not have text content");
        }
        const label = element.textContent.trim()
        if (label === "") {
          return undefined
        }
        return {
            label: label,
            value: element.value,
            selected: element.getAttribute("selected") === "",
        };
    })
      .filter((option) => option !== undefined);
  },
  _optionValuesToFdsDropdownOptions(optionValues: OptionValues[]): FdsDropdownOption<string>[] {
    return optionValues.map((optionValue) => ({
      label: optionValue.label,
      value: optionValue.value,
    }));
  }
};

ckan.module('digitraffic_core_multi_select', MultiSelect)