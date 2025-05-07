
export function initialize(this: ckan.ModulePreSet<HTMLElement>): void {
  ($ as ckan.CkanJquery).proxyAll(this, /^_/);
}