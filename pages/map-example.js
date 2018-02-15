const mapboxgl = require('mapbox-gl')
export default {
  components: {
  },
  created () {
  },
  mounted () {
    // import mapbox after load (not available during build on nodejs)
    const mapboxgl = require('mapbox-gl')
    this.mapboxgl = mapboxgl
    // See: https://github.com/mapbox/mapbox-gl-js/issues/4463

  },
  data () {
    return {
      mapStyle: 'mapbox://styles/siggyf/cjdk0ghmzjp8e2rmtzpqqdxat',
      center: [52, 3],
      zoom: 10
    }
  }
}
