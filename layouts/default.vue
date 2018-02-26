<template>
  <main>
    <nav class="link-menu">
      <nuxt-link class="home h1" to="/" title="Go home"><span class="sr-only">Return to the homepage</span>World<br />Water<br />Atlas</nuxt-link>
      <nuxt-link class="about h3" to="/about">About</nuxt-link>
    </nav>
    <globe-component
      class="globe-component"
      v-bind:active-marker="activeMarker"
      v-bind:active-theme="activeTheme"
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
      activeTheme: 'too-little',
      baseMarkers: markers,
      enableZoom: true,
      enableRotate: true,
      markers,
      staticPages: [{
        slug: 'about',
        path: '/about',
        title: 'About'
      }]
    }
  },
  created () {
    this.$events.$on(events.activeFeatureChanged, marker => {
      if (marker) {
        this.activeMarker = marker
      }
    })
    this.$events.$on(events.activeThemeChanged, theme => {
      this.activeTheme = theme || 'too-much'
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

.globe-component {
  position: fixed;
  z-index: -10;
  top:0;
}

.link-menu {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  color: var(--ui--text--invert);
}
.link-menu a:not(.home) {
  float: right;
  padding: 1rem;
  opacity: .6;
  transition: .5s opacity;
  font-weight: normal;
}
.link-menu a,
.link-menu a:hover,
.link-menu a:focus,
.link-menu a:active {
  text-decoration: none;
}
a.home {
  display: block;
  text-decoration: none;
  font-weight: normal;
  position: absolute;
  padding: 1rem;
  background-color: var(--ui--black--trans);
  z-index: 100;
}

.link-menu a:hover {
  opacity: 1;
  color: var(--ui--text--invert);
}
</style>
