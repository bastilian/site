//= require fetch
//= require map
//= require timeline
//= require content
//= require router

function Site() {

  this.initialize = function (url) {
    this.url      = url;

    this.data     = {};
    this.element  = document.querySelectorAll('#site')[0];
    this.router   = new Router(this);
    this.timeline = new Timeline(this);
    this.content  = new Content(this);
    this.map      = new Map();

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
      .then(function (json) {
        that.map.addMarkers(json.places);
      });
  }

  this.initialize.apply(this, arguments);
}
