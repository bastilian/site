function Map () {

  this.initialize = function (site) {
    this.site     = site;
    this.token    = 'pk.eyJ1IjoiYmFzdGlsaWFuIiwiYSI6IllDZ3lNZHMifQ.uwq0dxjwyWEuG3zF59wUig';
    this.geocoder = new google.maps.Geocoder();
    this.placesLayer   = new L.LayerGroup();
    this.marker        = L.divIcon({className: 'marker', iconSize : 5});
    this.currentMarker = L.divIcon({className: 'marker current', iconSize : 5});
    this.map = L.map('map', { zoomControl: false, layers: [this.placesLayer]}).setView([55, -45], 3);

    this.setupMap();
  }

  this.setupMap = function () {
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.keyboard.disable();

    if (this.map.tap) this.map.tap.disable();

    this.loadTileLayer();
  }

  this.mapAddress = function (address) {
    this.geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        L.marker([results[0].geometry.location.lat(),
                  results[0].geometry.location.lng()
        ], { icon: this.marker } ).addTo(this.placesLayer)
      }
    });
  }

  this.addMarker = function (place) {
    if (typeof place.latlng != 'undefined'){
      var marker = L.marker(place.latlng, { icon: (place.current ? this.currentMarker : this.marker) } )
                    .addTo(this.placesLayer);
    } else {
      this.mapAddress(place.location)
    }
  }

  this.addMarkers = function (places) {
    var i = 0
    places.forEach( function (place) {
      setTimeout(function () {
        this.addMarker(place)
      }.bind(this), 500 + 75 * i)
      i++
    }.bind(this));
  }

  this.loadTileLayer = function () {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.token, {
      id: 'mapbox.light',
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }).addTo(this.map)
  }

  this.initialize.apply(this, arguments);
}
