declare namespace ckan {
  export interface Module<T extends  HTMLElement> {
    initialize: () => void,
    el: JQuery<T>,
    $: (selector: string) => JQuery<T>,
    options: {[key:string]: unknown}
    [key: string]: unknown
  }
  // The properties function properties are actually (jQuery: jQuery, translate, i18n), but use of
  // 'translate' and 'i18n' are deprecated
  export function module<T>(name: string, properties: ((jQuery: import('ckan/ckan/public/base/vendor/jquery').jQuery) => Module<T>) | Module<T>): void;
}