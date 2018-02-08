<template>
  <main>
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
import events from '~/components/events/events'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const { books } = await loadData(context)
    const baseMarkers = books.map(book => book.chapters).reduce((a, b) => a.concat(b))
    return { baseMarkers }
  },
  data () {
    return {
      activeMarker: null,
      enableZoom: true,
      enableRotate: true,
      markers: []
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
    this.$events.$on(disableGlobeNavigation, marker => {
      this.enableZoom = false
      this.enableRotate = false
    })
  },
  methods: {
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
.globe-component {
  position: fixed;
  z-index: -1;
  top:0;
}

.card-list,
.card-list-item {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 20rem;
  max-height: 20vh;
  color: var(--ui--text--invert);
}

.card-list {
  box-sizing: border-box;
  padding-top: 5rem;
  z-index: -1;
}

.card-list-item {
  position: static;
}
</style>
