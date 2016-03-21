function TimelineEvent() {

  this.initialize = function (data, timeline) {
    this.element = el('a');
    this.element.classList.add('event')

    this.data    = data;
    this.date    = new Date(this.data.date);
    this.endDate = new Date(this.data.endDate);

    this.color = this.data.color;
    this.title = this.data.title;
    this.type  = this.data.type;
    this.url   = this.data.url;

    this.timeline = timeline;

    this.addElement();
  }

  this.position = function () {
    var yearsBetween = this.timeline.yearsBetween(this.timeline.startDate(), new Date(Date.now()));
    var width  = 100/yearsBetween/12;
    var monthsBetween = this.timeline.monthsBetween(this.timeline.startDate(), this.date);

    return width*monthsBetween;
  }

  this.addElement = function () {
    var yearsBetween = this.timeline.yearsBetween(this.timeline.startDate(), new Date(Date.now()));
    var width  = 100/yearsBetween/12;

    this.setColor(this.color);

    this.setLeft();

    if (this.endDate) {
      this.addExpanding(width);
    }

    if (this.type) {
      this.element.classList.add(this.type)
    }

    this.element.href = this.url;

    this.element.addEventListener('mouseover', function () {
      this.showEvent()
    }.bind(this))


    this.element.addEventListener('mouseout', function () {
      this.timeline.currentEventTimer = setTimeout(function () {
        this.hideEvent()
      }.bind(this), 1000)
    }.bind(this))

    this.timeline.eventsElement.appendChild(this.element);
  }

  this.hideEvent = function () {
    removeClass(this.timeline.currentEventElement, 'visible');
  }

  this.showEvent = function () {
    this.timeline.setCurrentEvent(this);
  }

  this.getContent = function () {
    var header = el('span');
    var content = el('p');

    header.textContent  = this.title;
    content.textContent = this.description;

    return { header: header, content: content };
  }

  this.addExpanding = function (monthWidth) {
    var months = this.timeline.monthsBetween(this.date, this.endDate);

    addClass(this.element, 'expanding');

    this.element.addEventListener('mouseover', function () {
      this.element.style.width = monthWidth*months + "%"
      addClass(this.element, 'expanded');
    }.bind(this));

    this.element.addEventListener('mouseout', function () {
      this.element.style.width = null;
      removeClass(this.element, 'expanded');
    }.bind(this))
  }

  this.setColor = function (color) {
    this.element.style.background = '#' + color;
  }

  this.setLeft = function () {
    this.element.style.left = this.position() + "%";
  }

  this.initialize.apply(this, arguments);
}
