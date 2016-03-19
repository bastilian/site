function TimelineContent() {

  this.initialize = function (timeline) {
    this.timeline = timeline;

    this.element    = el('div');
    this.element.id = 'timeline-content';

    this.header  = el('header');
    this.content = el('section');

    this.element.appendChild(this.header);
    this.element.appendChild(this.content);

    this.addElement();
  }

  this.updateContent = function (content) {
    if (content.header)
      empty(this.header);
      this.header.appendChild(content.header);

    if (content.content)
      empty(this.content);
      this.content.appendChild(content.content);
  }

  this.addElement = function () {
    this.timeline.element.appendChild(this.element);
  }

  this.initialize.apply(this, arguments);
}
