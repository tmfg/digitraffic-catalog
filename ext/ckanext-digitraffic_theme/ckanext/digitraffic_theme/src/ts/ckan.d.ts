declare namespace ckan {
  export interface Module {
    initialize: () => void,
    el: JQuery<HTMLElement>,
    $: JQuery<HTMLElement>,
    options: {[key:string]: unknown}
    [key: string]: unknown
  }
  // The properties function properties are actually (jQuery: jQuery, translate, i18n), but use of
  // 'translate' and 'i18n' are deprecated
  export function module(name: string, properties: ((jQuery: import('ckan/ckan/public/base/vendor/jquery').jQuery) => Module) | Module): void;
}