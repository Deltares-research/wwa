import '~/components/typography/typography.css'
import GlobeComponent from '~/components/globe-component/GlobeComponent'
import events from '~/components/events/events'

export default {
  data () {
    return {
      activeMarker: null,
      markers: []
    }
  },
  created () {
    this.$events.$on(events.activeMarkerChanged, marker => {
      this.activeMarker = marker
    })
    this.$events.$on(events.markersChanged, markers => {
      this.markers = markers
    })
  },
  methods: {
  },
  components: {
    GlobeComponent
  }
}
