function Router() {

  this.initialize = function (site) {
    this.site = site;
  }

  this.parseHtml = function (aHTMLString) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(aHTMLString, "text/html")

    return doc;
  }

  this.getContent = function (response) {
    var elm = this.parseHtml(response);

    content = el('div');
    content.innerHTML = elm.querySelectorAll('#content')[0].innerHTML;

    return { header: el('p'), content: content };
  }

  this.navigate = function (url) {
    var that = this;

    fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (body) {
        return that.getContent(body);
      })
      .then(function (content) {
        that.site.content.updateContent(content);
      })
      .then(function () {
        history.pushState({}, "Sebastian Gräßl", url);
      })
  }

  this.initialize.apply(this, arguments);
}
