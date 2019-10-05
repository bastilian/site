import Component from '../lib/component.js'
import TimelineEvent from './timeline_event.js'
import {
  el,
  empty,
  addClass,
  removeClass
} from '../lib/utilities.js'

export default class Timeline extends Component {
  init () {
    this.element = this

    this.events = []

    this.eventsElement = el('div')
    this.eventsElement.id = "events"
    this.element.appendChild(this.eventsElement)

    this.yearsElement = el('div')
    this.yearsElement.id = "years"
    this.element.appendChild(this.yearsElement)

    this.currentEventElement = el('div')
    this.currentEventElement.id = "current-event"
    this.currentEventElement.classList.add('visible')
    this.element.appendChild(this.currentEventElement)
  }

  setCurrentEvent (event) {
    clearTimeout(this.currentEventTimer)

    empty(this.currentEventElement)
    removeClass(this.currentEventElement, 'visible')

    let content = el('span')
    let title = el('span')

    title.classList.add('title')
    title.textContent = event.title

    content.appendChild(title)

    if (event.color) {
      content.style.color = '#' + event.color
    }


    this.currentEventElement.appendChild(content)

    addClass(this.currentEventElement, 'visible')
  }

  addEvent (data) {
    this.events.push(new TimelineEvent(data, this))
    empty(this.yearsElement)
    this.renderYears()
  }

  adjust () {
    this.events.forEach((timeline_event) => {
      timeline_event.setLeft()
    })
  }

  startDate () {
    if (this.events.length == 0) {
      return new Date(Date.now())
    }

    return this.events.min((event) => {
      return event.date
    }).date
  }

  endDate () {
    return this.events.max((event) => {
      return event.date
    }).date
  }

  // TODO: Date/Time Caclulations should move into their own class/object
  monthsBetween (start, end) {
    let months

    months = (end.getFullYear() - start.getFullYear()) * 12
    months -= start.getMonth() + 1
    months += end.getMonth()
    return months <= 0 ? 0 : months
  }

  yearsBetween (start, end) {
    return (this.monthsBetween(start, end)/12)
  }

  renderYears () {
    let yearsBetween = this.yearsBetween(this.startDate(), new Date(Date.now()))
    for( let i = 0; i < yearsBetween; i++ ) {
      let elm = this.createNodeForYear(this.startDate().getFullYear() + i)
      this.yearsElement.appendChild(elm)
    }
  }

  createNodeForYear (year) {
    let elm    = el("span")
    let date   = new Date(year + '-01-01')
    let yearsBetween = this.yearsBetween(this.startDate(), new Date(Date.now()))
    let width  = 100/yearsBetween/12
    let monthsBetween = this.monthsBetween(this.startDate(), date)

    elm.id = "year-" + year
    elm.classList.add('year')
    elm.style.left = width*monthsBetween + "%"

    if (year%1 == 0 || year == this.startDate().getFullYear()) {
      elm.textContent = year
    }

    elm.addEventListener('click', function () {
      location.href = '/about#' + year
    })

    return elm
  }
}
