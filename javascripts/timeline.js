import {
  el,
  addClass,
  removeClass
} from './utilities'

export default function TimelineEvent() {

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
    //
    // if (this.endDate) {
    //   this.addExpanding(width);
    // }

    if (this.type) {
      this.element.classList.add(this.type)
    }

    if (this.url) {
      this.element.href = this.url;
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
;
import TimelineEvent from './timeline_event.js';
import {
  el,
  empty,
  removeClass,
  addClass
} from './utilities.js';

export default function Timeline () {

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
    return (this.monthsBetween(start, end)/12);
  }

  this.renderYears = function () {
    var yearsBetween = this.yearsBetween(this.startDate(), new Date(Date.now()));
    for( var i = 0; i < yearsBetween; i++ ) {
      var elm = this.createNodeForYear(this.startDate().getFullYear() + i)
      this.yearsElement.appendChild(elm)
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

    if (year%1 == 0 || year == this.startDate().getFullYear()) {
      elm.textContent = year;
    }

    elm.addEventListener('click', function () {
      location.href = '/about#' + year;
    })

    return elm
  }

  this.initialize.apply(this, arguments);
}
;
