//= require timeline_event

function Timeline () {

  this.initialize = function (site) {
    this.site    = site;
    this.element = document.querySelectorAll('#timeline')[0];

    this.events  = [];

    this.eventsElement = el('div');
    this.eventsElement.id = "events";
    this.element.appendChild(this.eventsElement);

    this.yearsElement = el('div');
    this.yearsElement.id = "years";
    this.element.appendChild(this.yearsElement);

    this.currentEventElement = el('div');
    this.currentEventElement.id = "current-event";
    this.currentEventElement.classList.add('visible');
    this.element.appendChild(this.currentEventElement);
  }

  this.setCurrentEvent = function (event) {
    clearTimeout(this.currentEventTimer);

    empty(this.currentEventElement);
    removeClass(this.currentEventElement, 'visible');

    var content = el('span');
    var title = el('span');

    title.classList.add('title');
    title.textContent = event.title;

    content.appendChild(title);

    if (event.color)
      content.style.color = '#' + event.color;

    this.currentEventElement.appendChild(content);

    addClass(this.currentEventElement, 'visible');
  }

  this.addEvent = function (data) {
    this.events.push(new TimelineEvent(data, this));
    empty(this.yearsElement);
    this.renderYears();
  }

  this.adjust = function () {
    this.events.forEach(function (timeline_event) {
      timeline_event.setLeft();
    })
  }

  this.startDate = function () {
    if (this.events.length == 0) {
      return new Date(Date.now());
    }

    return this.events.min(function (event) {
      return event.date
    }).date;
  }

  this.endDate = function () {
    return this.events.max(function (event) {
      return event.date
    }).date;
  }

  this.monthsBetween = function (start, end) {
    var months;

    months = (end.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth() + 1;
    months += end.getMonth();
    return months <= 0 ? 0 : months;
  }

  this.yearsBetween = function (start, end) {
    return this.monthsBetween(start, end)/12;
  }

  this.renderYears = function () {
    var yearsBetween = this.yearsBetween(this.startDate(), new Date(Date.now()));

    for( var i = 0; i < yearsBetween; i++ ) {
      var elm = this.createNodeForYear(this.startDate().getFullYear()+i);
      this.yearsElement.appendChild(elm);
    }

  }

  this.createNodeForYear = function (year) {
    var elm    = el("span");
    var date   = new Date(year + '-01-01');
    var yearsBetween = this.yearsBetween(this.startDate(), new Date(Date.now()));
    var width  = 100/yearsBetween/12;
    var monthsBetween = this.monthsBetween(this.startDate(), date);

    elm.id = "year-" + year;
    elm.classList.add('year')
    elm.style.left = width*monthsBetween + "%";

    if (year%2 == 0 || year == this.startDate().getFullYear()) {
      elm.textContent = year;
    }

    return elm
  }

  this.initialize.apply(this, arguments);
}
