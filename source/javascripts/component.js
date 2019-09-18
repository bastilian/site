class Component extends HTMLElement {
}

Component.prototype.connectedCallback = function () {
  this['mounted']()
}
