import Vue from 'vue'
import VueEvents from 'vue-events'

Vue.use(VueEvents)

export const activeFeatureChanged = 'active-feature-changed'
export const featuresChanged = 'features-changed'
export const enableGlobeNavigation = 'enable-globe-navigation'
export const disableGlobeNavigation = 'disable-globe-navigation'

export default {
  activeFeatureChanged,
  featuresChanged,
  enableGlobeNavigation,
  disableGlobeNavigation
}
