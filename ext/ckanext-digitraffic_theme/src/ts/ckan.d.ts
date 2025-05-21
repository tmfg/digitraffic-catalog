declare namespace ckan {
  export type CkanJquery<T> = JQuery<T> & {
    proxyAll: (obj: {}) => void
  }

  export type ModuleJquery<T> = JQuery<T> & {
    0: T
  }

  export interface ModulePreSet<T extends  HTMLElement> {
    el: ModuleJquery<T>,
    $:<U extends HTMLElement> (selector: string) => CkanJquery<U>,
    options: {[key:string]: unknown}
  }
  export type $ = CkanJquery
  export type Module<T extends  HTMLElement, U extends {}> = {
    initialize: (this: ModulePreSet<T> & U) => void
  } & ModuleObject<T, U>

  export type CkanThis<T extends HTMLElement, U extends {}> = ModulePreSet<T> & U

  type ModuleObject<T extends HTMLElemenpt, U extends {}> = {
    [Property in keyof U]: U[Property] extends (...args: infer Parameters) => infer ReturnType ? (this: ModulePreSet<T> & U, ...args: Parameters) => ReturnType : U[Property]
  }
  // The properties function properties are actually (jQuery: jQuery, translate, i18n), but use of
  // 'translate' and 'i18n' are deprecated
  export function module<T>(name: string, properties: ((jQuery: CkanJquery<T>) => Module<T>) | Module<T>): void;
}

declare const ckan: typeof ckan;