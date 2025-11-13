
export function initialize(this: ckan.ModulePreSet<HTMLElement>): void {
  ($ as ckan.$).proxyAll(this, /^_/);
}