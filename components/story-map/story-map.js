export default {
  props: {
    mapStyle: {
      type: String,
      default: 'mapbox://styles/siggyf/cjdk0ghmzjp8e2rmtzpqqdxat'
    },
    wmsLayer: {
      type: String
    },
    center: {
      type: Array
    },
    zoom: {
      type: Number
    }
  },
  components: {
  },
  created () {
  },
  mounted () {
    // import mapbox after load (not available during build on nodejs)
    // See: https://github.com/mapbox/mapbox-gl-js/issues/4463
    // wwa access token
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2lnZ3lmIiwiYSI6ImNqZGsybjA4dTFvNnMzMnFvNXNkdXpiYXAifQ.cXeF4BQA1dKV6L--GI2Q_A'
    const mapElement = this.$el.querySelector('.map')
    const map = new mapboxgl.Map({
      container: mapElement,
      style: this.mapStyle
    })
    map.setCenter(this.center)
  },
  data () {
    return {
    }
  }
}
