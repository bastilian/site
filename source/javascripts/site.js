//= require component
//= require fetch
//= require map
//= require timeline
//= require content
//= require router

class Site extends Component {
  mounted () {
    this.url      = this.getAttribute('url');;

    this.data     = {};
    this.router   = new Router(this);
    this.timeline = new Timeline(this);
    this.content  = new Content(this);
    this.map      = new Map();

    this.getData();
  }

  getData () {
    fetch(this.url)
      .then((response) => response.json())
      .then((json) => this.setData(json))
      .then((json) => {
        var i = 0
        this.data.events.forEach((event) => {
          setTimeout(() => {
            this.timeline.addEvent(event);
          }, 1200 + 35*i)
          i++;
        });
        this.map.addMarkers(this.data.places);
      });
  }

  setData (json) {
    return this.data = json;
  }
}

// "site" is not a valid custom element name
createComponent('my-site', Site);
