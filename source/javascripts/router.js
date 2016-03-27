function Router() {

  this.initialize = function (site) {
    this.site = site;

    this.registerLinkListener();
  }

  this.getLink = function (element, depth) {
    var elm;

    if (!index)
      var index = 1;

    if (!depth)
      var depth = 2;

    while (index < depth) {
      if (element.parentNode.tagName == 'A') {
        elm = element.parentNode;
        break;
      }

      index++;
    }

    return elm;
  }

  this.registerLinkListener = function () {
    this.site.element.addEventListener('click', function (event) {
      event.preventDefault();

      var link = event.target;

      if (!link.href)
        link = this.getLink(event.target);

      this.navigate(link.href);

      event.stopPropagation();
    }.bind(this))

    window.addEventListener('popstate', function (event) {
      this.fetchContent(event.target.location.pathname);
    }.bind(this))
  }

  this.parseHtml = function (aHTMLString) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(aHTMLString, "text/html")

    return doc;
  }

  this.getContent = function (response) {
    var elm = this.parseHtml(response);

    var content = el('div');
    content.innerHTML = elm.querySelectorAll('#content')[0].innerHTML;

    var site_classes = elm.querySelectorAll('#site')[0].classList
    var title        = elm.querySelectorAll('title')[0].textContent;

    return { content: content, site_classes: site_classes, title: title };
  }

  this.fetchContent = function (url) {
    var that = this;

    return fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (body) {
        return that.getContent(body);
      })
      .then(function (content) {
        that.site.content.updateContent(content);

        return content;
      })
      .then(function (content) {
        document.title = content.title;
      });
  }

  this.navigate = function (url) {
    this.fetchContent(url)
      .then(function () {
        history.pushState(null, null, url);
      })
  }

  this.initialize.apply(this, arguments);
}
