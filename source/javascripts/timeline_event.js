function TimelineEvent() {

  this.initialize = function (data, timeline) {
    this.element = el('span');
    this.element.classList.add('event')

    this.data    = data;
    this.date    = new Date(this.data.date)
    this.endDate = new Date(this.data.endDate)

    this.color       = this.data.color;
    this.title       = this.data.title;
    this.description = this.data.description;
    this.image       = this.data.image;
    this.type        = this.data.type;

    this.timeline    = timeline;
  }

  this.addElement = function () {
    var yearsBetween = this.timeline.yearsBetween(this.timeline.startDate(), new Date(Date.now()));
    var width  = 100/yearsBetween/12;
    var monthsBetween = this.timeline.monthsBetween(this.timeline.startDate(), this.date);

    this.setLeft(width*monthsBetween);
    this.setColor(this.color);

    if (this.endDate) {
      this.addExpanding(width);
    }

    if (this.type) {
      switch (this.type) {
        case "talk":
          this.element.classList.add('minor')
          break;
      }
    }

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

  this.addExpanding = function (monthWidth) {

    var months = this.timeline.monthsBetween(this.date, this.endDate);
    this.element.classList.add('expanding')

    this.element.addEventListener('mouseover', function () {
      this.element.style.width = monthWidth*months + "%"
    }.bind(this))

    this.element.addEventListener('mouseout', function () {
      this.element.style.width = "10px"
    }.bind(this))
  }

  this.setColor = function (color) {
    this.element.style.background = '#' + color;
  }

  this.setLeft = function (left) {
    this.element.style.left = left + "%";
  }

  this.initialize.apply(this, arguments);
}
