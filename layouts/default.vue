<template>
  <main>
    <globe-component class="globe-component" :activeMarker="activeMarker" />
    <nuxt/>
  </main>
</template>
<script>
import Vue from 'vue'
import VueEvents from 'vue-events'

import '~/components/typography/typography.css'
import GlobeComponent from '~/components/globe-component/GlobeComponent'

Vue.use(VueEvents)

export default {
  data () {
    return {
      activeMarker: null
    }
  },
  created () {
    this.$events.$on('marker-selected', marker => {
      this.activeMarker = marker
    })
  },
  methods: {
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

  .app,
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
