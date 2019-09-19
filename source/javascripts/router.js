class Router {
  constructor (site) {
    this.site = site;
    this.registerLinkListener();
  }

  registerLinkListener () {
    this.site.addEventListener('click', (event) => {
      const link = event.target

      if (!link.href) {
        link = this.getLink(event.target)
      };

      if (link && !link.href.startsWith('mailto') && !this.stripOwnLocation(link.href).startsWith('http')) {
        this.navigate(link.href)
        event.preventDefault()
        event.stopPropagation()
      }

    })

    window.addEventListener('popstate', (event) => {
      this.fetchContent(event.target.location.pathname)
    })
  }

  getLink (element, depth) {
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

  stripOwnLocation (href) {
    var link = href.replace('http://' + location.host, '')

    if (link.startsWith(':')) {
      link = link.replace(':' + location.port)
    }

    return link
  }

  getContent (response) {
    var elm = html(response);

    var content = el('div');
    content.innerHTML = elm.querySelectorAll('#content')[0].innerHTML;

    var site_classes = elm.querySelectorAll('#site')[0].classList
    var title        = elm.querySelectorAll('title')[0].textContent;

    return { content: content, site_classes: site_classes, title: title };
  }

  fetchContent = (url) => {
    return fetch(url)
      .then((response) => response.text())
      .then((body) => this.getContent(body))
      .then((content) => {
        this.site.content.updateContent(content.content.innerHTML);
        return content;
      })
      .then((content) => {
        document.title = content.title;
      });
  }

  navigate (url) {
    this.fetchContent(url)
      .then(() => {
        history.pushState(null, null, url);
      })
  }
}
