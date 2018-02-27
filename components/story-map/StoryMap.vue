<template>
  <div>
    <div data-story-map class="story-map"></div>
  </div>
</template>

<script>
const apiKey = 'pk.eyJ1Ijoic2lnZ3lmIiwiYSI6ImNqZGsybjA4dTFvNnMzMnFvNXNkdXpiYXAifQ.cXeF4BQA1dKV6L--GI2Q_A'

export default {
  head: {
    script: [
      { src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.js', defer: true }
    ],
    link: [
      { href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.css', rel: 'stylesheet' }
    ]
  },
  props: {
    mapboxStyle: {
      type: String,
      default: 'mapbox://styles/mapbox/satellite-v9'
    },
    wmsLayer: String,
    center: Array,
    zoom: Number
  },
  mounted () {
    if (!mapboxgl) { return }
    mapboxgl.accessToken = apiKey
    const mapElement = this.$el.querySelector('[data-story-map]')
    const map = new mapboxgl.Map({
      container: mapElement,
      style: this.mapboxStyle
    })
    map.scrollZoom.disable()
    return map
  }
}
</script>

<style>

.story-map {
  width: 100%;
  height: 200px;
}
</style>
