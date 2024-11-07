
export function initialize() {
  $.proxyAll(this, /_on|_handle/);
}