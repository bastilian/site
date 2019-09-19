class Component extends HTMLElement {
  constructor () {
    super();
    if (this['init']) {
      this['init']()
    }
    // For now this is fine.
    // But this is something the library shouldn't be concerened with
    this.style.display = 'block';
  }

  connectedCallback() {
    if (this['mounted']) {
      this['mounted']()
    }

    if (this['render']) {
      this.realRender();
    }
  }

  renderIn (content) {
    const parsedContent = new DOMParser().parseFromString(content, 'text/html').body.firstChild;
    empty(this);
    this.appendChild(parsedContent);
  }

  realRender () {
    this.renderIn(this['render']());
  }

  rerender () {
    this.realRender();
  }

  static componentPrefix () {
    return 'my';
  }

  static create(...args) {
    args[0] = `${this.componentPrefix()}-${args[0]}`;
    customElements.define(...args);
  }
};
