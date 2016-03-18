//= require timeline_event

function Timeline () {

  this.initialize = function (element) {
    this.element = document.querySelectorAll(element)[0];
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

    var title = el('span');
    title.textContent = event.title;

    if (event.color) {
      title.style.color = '#' + event.color;
    }

    this.currentEventElement.appendChild(title);

    var description = el('p');
    description.textContent = event.description;
    this.currentEventElement.appendChild(description);

    addClass(this.currentEventElement, 'visible');
  }

  this.startDate = function () {
    return this.events.min(function (event) {
      return event.date
    }).date
  }

  this.endDate = function () {
    return this.events.max(function (event) {
      return event.date
    }).date
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

  this.addEvent = function (data) {
    this.events.push(new TimelineEvent(data, this));
  }

  this.addYears = function () {
    var yearsBetween = this.yearsBetween(this.startDate(), new Date(Date.now()));

    for( var i = 1; i < yearsBetween; i++ ) {
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

    if (year%5 == 0) {
      elm.textContent = year;
    }

    return elm
  }

  this.render = function () {
    this.events.sortBy(function (event) {
      return event.date;
    });
    this.addYears();
    this.addEvents();
  }

  this.addEvents = function () {
    this.events.forEach(function (event) {
      event.addElement();
    });
  }

  this.initialize.apply(this, arguments);
}