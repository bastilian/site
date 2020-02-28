import Timeline from './timeline.js';
import Content from './content.js';
import Router from './router.js';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

export default function Site() {

  this.initialize = function (url) {
    this.url      = url;

    this.data     = {};
    this.element  = document.querySelectorAll('#site')[0];
    this.router   = new Router(this);
    this.timeline = new Timeline(this);
    this.content  = new Content(this);

    this.getData();
  }

  this.getData = function () {
    var that = this;

    fetch(this.url)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        var i = 0
        json.events.forEach(function (event) {
          setTimeout(function () {
            that.timeline.addEvent(event);
          }.bind(this), 1200 + 35*i)
          i++;
        });
        return that.data = json;
      })
  }

  this.initialize.apply(this, arguments);
}
;
