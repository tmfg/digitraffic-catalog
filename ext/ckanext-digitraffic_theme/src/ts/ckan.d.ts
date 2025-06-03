declare namespace ckan {
  export type CkanJquery = import('ckan/ckan/public/base/vendor/jquery').jQuery<T> & {
    proxyAll: (obj: {}) => void
  }

  export interface ModulePreSet<T extends  HTMLElement> {
    el: CkanJquery, // import('ckan/ckan/public/base/vendor/jquery').jQuery<T>,
    $: (selector: string) => CkanJquery, // import('ckan/ckan/public/base/vendor/jquery').jQuery<T>,
    options: {[key:string]: unknown}
  }
  export type Module<T extends  HTMLElement, U extends {} /*ModuleObject<T, {}>*/> = {
    initialize: (this: ModulePreSet<T> & U) => void
  } & ModuleObject<T, U>

  export type CkanThis<T extends HTMLElement, U extends {}> = ModulePreSet<T> & U

  type ModuleObject<T extends HTMLElement, U extends {}> = {
    [Property in keyof U]: U[Property] extends (...args: infer Parameters) => infer ReturnType ? (this: ModulePreSet<T> & U, ...args: Parameters) => ReturnType : U[Property]
  }
  // The properties function properties are actually (jQuery: jQuery, translate, i18n), but use of
  // 'translate' and 'i18n' are deprecated
  export function module<T>(name: string, properties: ((jQuery: CkanJquery /* import('ckan/ckan/public/base/vendor/jquery').jQuery*/) => Module<T>) | Module<T>): void;
}

declare const ckan: typeof ckan;