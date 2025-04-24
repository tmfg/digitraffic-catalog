import {
  type FdsMultiSelect,
} from "@fintraffic/fds-coreui-components/dist/multi-select";
// Import for the side effect of web component getting defined
import "@fintraffic/fds-coreui-components/dist/define/fds-multi-select";

export const multiSelect = {
  initialize: function () {

    customElements.whenDefined("fds-multi-select").then(() => {
      const fdsMultiSelect = document.createElement(
        "fds-multi-select"
      ) as FdsMultiSelect;

      this.el.replaceWith(fdsMultiSelect);
    });
  }
} as unknown as ckan.Module<HTMLDivElement>;

ckan.module('digitraffic_theme_multi_select', function (_) {
  return multiSelect
})