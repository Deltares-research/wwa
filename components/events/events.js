import Vue from 'vue'
import VueEvents from 'vue-events'

Vue.use(VueEvents)

export const activeFeatureChanged = 'active-feature-changed'
export const featuresChanged = 'features-changed'

export default {
  activeFeatureChanged,
  featuresChanged
}
