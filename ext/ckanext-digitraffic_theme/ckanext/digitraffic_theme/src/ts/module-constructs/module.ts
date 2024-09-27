export const ModuleBase= {
  initialize() {
    $.proxyAll(this, /_on/);
  }
} as ckan.Module