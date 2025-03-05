import type * as ckan from "../ckan";
import {
  FdsNavigationVariant,
  type FdsNavigation,
  type FdsNavigationItem,
} from "@fintraffic/fds-coreui-components/dist/navigation";
// Import for the side effect of web component getting defined
import "@fintraffic/fds-coreui-components/dist/define/fds-navigation";

interface DT_TopNavigationItem extends FdsNavigationItem {
  url: string;
}

ckan.module("digitraffic_theme_top_navigation", function ($) {
  return {
    initialize: function () {
      const DIGITRAFFIC_SERVICE = {
        label: "Digitraffic",
        value: "digitraffic",
        url: "https://www.digitraffic.fi/",
      };

      const FT_SERVICES: DT_TopNavigationItem[] = [
        {
          label: "Liikennetilanne",
          value: "liikennetilanne",
          url: "https://liikennetilanne.fintraffic.fi/",
        },
        {
          label: "Palauteväylä",
          value: "palautevayla",
          url: "https://www.palautevayla.fi/aspa?lang=fi",
        },
        {
          label: "Junalähdöt",
          value: "junalahdot",
          url: "https://junalahdot.fintraffic.fi/",
        },
        {
          label: "Drone-palvelut",
          value: "dronepalvelut",
          url: "https://skynavx.fi/#/drone",
        },
        DIGITRAFFIC_SERVICE,
        {
          label: "Digitransit",
          value: "digitransit",
          url: "https://digitransit.fi/",
        },
        {
          label: "Reittiopas",
          value: "reittiopas",
          url: "https://opas.matka.fi/",
        },
        { label: "NAP", value: "nap", url: "https://finap.fi/#/" },
      ];
      customElements.whenDefined("fds-navigation").then(() => {
        const fdsNavigation = document.createElement(
          "fds-navigation"
        ) as FdsNavigation;
        fdsNavigation.setAttribute("vertical-menu-threshold", "1225");
        fdsNavigation.innerHTML = `
      <a href="https://www.fintraffic.fi/fi">
              <svg viewBox="0 0 253 42" style="height: 18px">
                  <use href="/assets/fintraffic_horizontal_white.svg#fintraffic_horizontal_white"></use>
              </svg>
          </a>`;

        const handleSelection = (event) => {
          const item = event.detail;
          window.open(item.url, "_blank");
          event.target.selected = DIGITRAFFIC_SERVICE;
        };

        fdsNavigation.variant = FdsNavigationVariant.primary;
        fdsNavigation.items = FT_SERVICES;
        fdsNavigation.selected = DIGITRAFFIC_SERVICE;
        fdsNavigation.verticalMenuNavText = "Services";

        fdsNavigation.addEventListener("select", handleSelection);

        this.el.replaceWith(fdsNavigation);
      });
    },
  };
});
