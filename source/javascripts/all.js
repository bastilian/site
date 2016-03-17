//= require_tree .

var geocoder = new google.maps.Geocoder();

function initMap() {
  var cities = new L.LayerGroup();

  var visited_cities = [
    {
      location: 'Budapest, Hungary',
      latlng: [47.497912, 19.04023499999994]
    },
    {
      location: 'Krakow, Poland',
      latlng: [50.06465009999999, 19.94497990000002]
    },
    {
      location: 'Bratislava, Slovakia',
      latlng: [48.1485965, 17.107747700000004]
    },
    {
      location: 'Vienna, Austria',
      latlng: [48.2081743, 16.37381890000006],
    },
    {
      location: 'Berlin, Germany',
      latlng: [52.52000659999999, 13.404953999999975],
    },
    {
      location: 'London, UK',
      latlng: [51.5073509, -0.12775829999998223]
    },
    {
      location: 'Bristol, UK',
      latlng: [51.454513, -2.5879099999999653]
    },
    {
      location: 'San Francisco, US',
      latlng: [37.7749295, -122.41941550000001]
    },
    {
      location: 'Austin, US',
      latlng: [30.267153, -97.74306079999997]
    },
    {
      location: 'Helsinki, Finland',
      latlng: [60.16985569999999, 24.93837899999994]
    },
    {
      location: 'Amsterdam, NL',
      latlng: [52.3702157, 4.895167899999933]
    },
    {
      location: 'Rotterdam, NL',
      latlng: [51.9244201, 4.477732500000002]
    },
    {
      location: 'Brussels, Belgium',
      latlng: [50.8503396, 4.351710300000036]
    },
    {
      location: 'Ghent, Belgium',
      latlng: [51.0543422, 3.717424299999948]
    },
    {
      location: 'Manchester, UK',
      latlng: [53.4807593, -2.2426305000000184]
    },
    {
      location: 'Istanbul, Turkey',
      latlng: [41.0082376, 28.97835889999999]
    }
  ];

  visited_cities.forEach( function (city) {
    if (typeof city.latlng != 'undefined'){
      L.marker(city.latlng).addTo(cities)
    } else {
      mapAddress(city, cities)
    }

  });

  var map = L.map('map', {
      zoomControl: false,
      layers: [cities]
  }).setView([50, -14], 3);

  // Disable drag and zoom handlers.
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.keyboard.disable();

  // Disable tap handler, if present.
  if (map.tap) map.tap.disable();

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmFzdGlsaWFuIiwiYSI6IllDZ3lNZHMifQ.uwq0dxjwyWEuG3zF59wUig', {
    id: 'mapbox.light'
  }).addTo(map)

}

function mapAddress(address, layer) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log(address, [results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
      L.marker([results[0].geometry.location.lat(), results[0].geometry.location.lng()]).addTo(layer)
    }
  });
}
