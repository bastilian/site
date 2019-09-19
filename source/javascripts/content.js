class Content extends Component {
  init () {
    this.contentBody = this.innerHTML;
  }

  updateContent (content) {
    this.contentBody = content;
    this.rerender();
  }

  render () {
    return this.contentBody;
  }
}

Component.create('content', Content);
