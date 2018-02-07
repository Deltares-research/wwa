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
