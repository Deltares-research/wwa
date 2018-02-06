import Vue from 'vue'
import VueEvents from 'vue-events'

Vue.use(VueEvents)

export const activeMarkerChanged = 'active-marker-changed'
export const markersChanged = 'markers-changed'

export default {
  activeMarkerChanged,
  markersChanged
}
