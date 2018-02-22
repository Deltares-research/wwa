<template>
  <div>
    <div data-story-map class="map"></div>
  </div>
</template>


<script>
export default {
  props: {
    mapboxStyle: {
      type: String,
      default: 'mapbox://styles/mapbox/satellite-v9'
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
    const mapElement = this.$el.querySelector('[data-story-map]')
    const map = new mapboxgl.Map({
      container: mapElement,
      style: this.mapboxStyle
    })
    return map
  }
}
</script>

<style>

.map {
  width: 100%;
  /* TODO: smarter height */
  height: 200px;
}
</style>
