export default {
  components: {
  },
  created () {
  },
  mounted () {
    // import mapbox after load (not available during build on nodejs)
    // See: https://github.com/mapbox/mapbox-gl-js/issues/4463
    // wwa access token
    mapboxgl.apiToken = 'pk.eyJ1Ijoic2lnZ3lmIiwiYSI6ImNqZGsybjA4dTFvNnMzMnFvNXNkdXpiYXAifQ.cXeF4BQA1dKV6L--GI2Q_A'
    const map = mapboxgl.Map({
      container: this.$el.querySelector('#map'),
      style: this.mapStyle
    })


  },
  data () {
    return {
      mapStyle: 'mapbox://styles/siggyf/cjdk0ghmzjp8e2rmtzpqqdxat',
      center: [52, 3],
      zoom: 10
    }
  }
}
