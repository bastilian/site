function Content() {

  this.initialize = function (site) {
    this.site    = site;
    this.body    = document.querySelectorAll('body')[0];
    this.element = document.querySelectorAll('#content')[0];
  }

  this.updateContent = function (content) {
    empty(this.element);
    this.site.element.className = content.site_classes;
    this.element.appendChild(content.content);
  }

  this.initialize.apply(this, arguments);
}
