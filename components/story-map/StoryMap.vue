<template>
  <div>
    <div
      data-story-map
      class="story-map"
    />
  </div>
</template>

<script>
const apiKey = 'pk.eyJ1Ijoic2lnZ3lmIiwiYSI6ImNqZGsybjA4dTFvNnMzMnFvNXNkdXpiYXAifQ.cXeF4BQA1dKV6L--GI2Q_A'
import mapboxgl from 'mapbox-gl'
import mapboxglStyle from 'mapbox-gl/dist/mapbox-gl.css'

export default {
  props: {
    mapboxStyle: {
      type: String,
      default: 'mapbox://styles/mapbox/satellite-v9',
    },
    wmsLayer: String,
    center: Array,
    zoom: Number,
  },
  mounted () {
    if (!mapboxgl) { return }
    mapboxgl.accessToken = apiKey
    const mapElement = this.$el.querySelector('[data-story-map]')
    const map = new mapboxgl.Map({
      container: mapElement,
      style: this.mapboxStyle,
    })
    map.scrollZoom.disable()
    map.addControl(new mapboxgl.NavigationControl())
    return map
  },
}
</script>

<style>

.story-map {
  width: 100%;
  height: 306px;
}

</style>
