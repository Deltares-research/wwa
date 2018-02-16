<template>
  <main>
    <nuxt-link class="home h1" to="/" title="Go home"><span class="sr-only">Return to the homepage</span>World Water<br />Atlas</nuxt-link>
    <globe-component
      class="globe-component"
      v-bind:active-marker="activeMarker"
      v-bind:enable-zoom="enableZoom"
      v-bind:enable-rotate="enableRotate"
      v-bind:markers="markers"
    />
    <nuxt/>
  </main>
</template>
<script>
import GlobeComponent from '~/components/globe-component/GlobeComponent'
import events from '~/lib/events'
import books from '~/static/data/books/index.json'

const markers = books
  .reduce((a, b) => a.concat(b.chapters), []) // flatten array
  .filter(marker => marker.location)

export default {
  data () {
    return {
      activeMarker: null,
      baseMarkers: markers,
      enableZoom: true,
      enableRotate: true,
      markers
    }
  },
  created () {
    this.$events.$on(events.activeFeatureChanged, marker => {
      this.activeMarker = marker
    })
    this.$events.$on(events.enableGlobeNavigation, marker => {
      this.enableZoom = true
      this.enableRotate = true
    })
    this.$events.$on(events.disableGlobeNavigation, marker => {
      this.enableZoom = false
      this.enableRotate = false
    })
    this.$events.$on(events.featuresChanged, markers => {
      this.markers = markers || this.baseMarkers
    })
  },
  components: {
    GlobeComponent
  }
}
</script>

<style>
@import '../components/colors/colors.css';

html {
  padding: 0;
  margin: 0;
}
main {
  width: 0;
  height: 0; /* do not obstruct globe */
  overflow: visible;
}

.home,
.home:hover {
  display: block;
  color: var(--ui--text--invert);
  text-decoration: none;
  position: relative;
  z-index: 100;
  padding: 1rem;
}

.globe-component {
  position: fixed;
  z-index: -1;
  top:0;
}
</style>
