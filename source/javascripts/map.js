function Map () {

  this.initialize = function (places) {
    this.token    = 'pk.eyJ1IjoiYmFzdGlsaWFuIiwiYSI6IllDZ3lNZHMifQ.uwq0dxjwyWEuG3zF59wUig';
    this.geocoder = new google.maps.Geocoder();
    this.places   = places;
    this.placesLayer   = new L.LayerGroup();
    this.marker        = L.divIcon({className: 'marker', iconSize : 5});
    this.currentMarker = L.divIcon({className: 'marker current', iconSize : 5});

    this.setupMap();
    this.addMarkers();
  }

  this.setupMap = function () {
    this.map = L.map('map', { zoomControl: false, layers: [this.placesLayer]}).setView([50, -14], 3);

    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.keyboard.disable();

    if (this.map.tap) this.map.tap.disable();

    this.loadTileLayer();
  }

  this.mapAddress = function (address) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(address, [results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
        L.marker([results[0].geometry.location.lat(),
                  results[0].geometry.location.lng()
        ], { icon: this.marker } ).addTo(this.placesLayer)
      }
    });
  }

  this.addMarkers = function () {
    this.places.forEach( function (city) {
      if (typeof city.latlng != 'undefined'){
        console.log(city.location);
        var marker = L.marker(city.latlng, { icon: (city.current ? this.currentMarker : this.marker) } ).addTo(this.placesLayer)

        if (city.current) {
          marker.bindPopup("currently living in<br/> <strong>" + city.location + "</strong>", { closeButton: false, zoomAnimation: false, className: 'tooltip'}).openPopup()
        }
      } else {
        this.mapAddress(city)
      }
    }.bind(this));
  }

  this.loadTileLayer = function () {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.token, {
      id: 'mapbox.light'
    }).addTo(this.map)
  }

  this.initialize.apply(this, arguments);
}
