import type jQuery from '@types/jquery'

declare module 'ckan' {
  export type Module = {
    initialize: () => void
  }
  // The properties function properties are actually (jQuery: jQuery, translate, i18n), but use of
  // 'translate' and 'i18n' are deprecated
  export function module(name: string, properties: ((jQuery: jQuery) => Module) | Module): void;
}