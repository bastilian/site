/* global google, L */
import Component from '../lib/component.js'

export default class Map extends Component {
  init () {
    this.token         = 'pk.eyJ1IjoiYmFzdGlsaWFuIiwiYSI6IllDZ3lNZHMifQ.uwq0dxjwyWEuG3zF59wUig'
    this.placesLayer   = new L.LayerGroup()
    this.geocoder      = new google.maps.Geocoder()
    this.marker        = L.divIcon({className: 'marker', iconSize : 5})
    this.currentMarker = L.divIcon({className: 'marker current', iconSize : 5})

    this.id = 'leaflet-map'
  }

  mounted () {
    this.setupMap()
  }

  setupMap () {
    this.map = L.map('leaflet-map', { zoomControl: false, layers: [this.placesLayer]}).setView([55, -45], 3)
    this.disbleInteractions()
    this.loadTileLayer()
  }

  disbleInteractions () {
    this.map.dragging.disable()
    this.map.touchZoom.disable()
    this.map.doubleClickZoom.disable()
    this.map.scrollWheelZoom.disable()
    this.map.keyboard.disable()

    if (this.map.tap) this.map.tap.disable()
  }

  mapAddress (address) {
    this.geocoder.geocode({'address': address}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        L.marker([results[0].geometry.location.lat(),
                  results[0].geometry.location.lng()
        ], { icon: this.marker } ).addTo(this.placesLayer)
      }
    })
  }

  addMarker (place) {
    if (typeof place.latlng != 'undefined'){
      L.marker(place.latlng, { icon: (place.current ? this.currentMarker : this.marker) } )
                    .addTo(this.placesLayer)
    } else {
      this.mapAddress(place.location)
    }
  }

  addMarkers (places) {
    let i = 0
    places.forEach((place) =>  {
      setTimeout(() => {
        this.addMarker(place)
      }, 500 + 75 * i)
      i++
    })
  }

  loadTileLayer () {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.token, {
      id: 'mapbox.light',
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }).addTo(this.map)
  }
}
