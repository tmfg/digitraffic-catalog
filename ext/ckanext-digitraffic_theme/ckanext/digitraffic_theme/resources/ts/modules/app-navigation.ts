import type * as ckan from '../ckan'
import {
  FdsNavigationVariant,
  type FdsNavigation,
  type FdsNavigationItem
} from "@fintraffic/fds-coreui-components/dist/navigation";
// Import for the side effect of web component getting defined
import "@fintraffic/fds-coreui-components/dist/define/fds-navigation"

interface DT_TopNavigationItem extends FdsNavigationItem {
  url: string
}

ckan.module('digitraffic_theme_app_navigation', function ($) {
  return {
    initialize: function () {

      customElements.whenDefined("fds-navigation").then(() => {
        console.log('fds-navigation DEFINED')
        console.log(this.el)
        console.log(this.options)
        const fdsNavigation = document.createElement("fds-navigation") as FdsNavigation
        fdsNavigation.setAttribute("vertical-menu-threshold", "1150")
        fdsNavigation.innerHTML = `
        <span>Datakatalogi</span>
        `;

        const handleSelection = (event) => {
          const item = event.detail;
          window.location.href = item.url;
        };

        const DATACATALOG_NAVIGATION:DT_TopNavigationItem[] = [
          {label: this.options["datasetLabel"], value: "dataset", url: this.options["datasetUrl"]},
          {label: this.options["organizationLabel"], value: "organization", url: this.options["organizationUrl"]},
          {label: this.options["groupLabel"], value: "group", url: this.options["groupUrl"]},
          {label: this.options["aboutLabel"], value: "about", url: this.options["aboutUrl"]},
        ]

        const currentNavigation = DATACATALOG_NAVIGATION.filter(({ url }) => {
          return window.location.pathname.includes(url)
        })[0]

        fdsNavigation.variant = FdsNavigationVariant.secondary;
        fdsNavigation.items = DATACATALOG_NAVIGATION;
        fdsNavigation.selected = currentNavigation;
        fdsNavigation.verticalMenuNavText = "Nav";

        fdsNavigation.addEventListener('select', handleSelection);

        this.el.replaceWith(fdsNavigation)
      })
    }
  }
})