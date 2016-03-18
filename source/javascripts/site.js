//= require fetch
//= require map
//= require timeline

function Site() {

  this.initialize = function (url) {
    this.url      = url;
    this.map      = Map;
    this.timeline = new Timeline('#timeline');
    this.data     = {};

    this.getData();
  }

  this.addMap = function () {
    this.map = new Map(this.data.places);
  }

  this.addEvents = function () {
    this.data.events.forEach(function (event) {
      this.timeline.addEvent(event);
    }.bind(this));
  }

  this.getData = function () {
    var that = this;

    fetch(this.url)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        that.data = json;
      })
      .then(function () {
        that.addMap();
      })
      .then(function () {
        that.addEvents();
      })
      .then(function () {
        that.timeline.render();
      })
  }

  this.initialize.apply(this, arguments);
}
