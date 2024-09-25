import $ from 'ckan/ckan/public/base/vendor/jquery'

declare module 'ckan' {
  export type Module = {
    initialize: () => void,
    [key: string]: unknown
  }
  // The properties function properties are actually (jQuery: jQuery, translate, i18n), but use of
  // 'translate' and 'i18n' are deprecated
  export function module(name: string, properties: ((jQuery: $) => Module) | Module): void;
}