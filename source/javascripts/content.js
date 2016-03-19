function Content() {

  this.initialize = function (site) {
    this.site    = site;
    this.element = document.querySelectorAll('#content')[0];
  }

  this.updateContent = function (content) {
    empty(this.element);
    this.element.appendChild(content);
  }

  this.initialize.apply(this, arguments);
}
