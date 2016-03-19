function Content() {

  this.initialize = function (site) {
    this.site    = site;
    this.element = document.querySelectorAll('#content')[0];
    this.content = document.querySelectorAll('#content section')[0];
    this.header  = document.querySelectorAll('#content header')[0];

    if (!this.content) {
      this.content = el('section');
      this.element.appendChild(this.content);
    };

    if (!this.header) {
      this.header = el('header');
      this.element.appendChild(this.header);
    }
  }

  this.updateContent = function (content) {
    if (content.header)
      empty(this.header);
      this.header.appendChild(content.header);

    if (content.content)
      empty(this.content);
      this.content.appendChild(content.content);
  }

  this.initialize.apply(this, arguments);
}
