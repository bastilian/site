//= require leaflet

import Application from './lib/application.js'
import Router from './lib/router.js'

import Site from './components/site.js'
import Timeline from './components/timeline.js'
import Map from './components/map.js'

const app = new Application({
  components: {
    'map': Map,
    'site': Site,
    'timeline': Timeline
  }
})

app.then(() => {
  console.log('Application loaded')
})
