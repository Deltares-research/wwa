import Vue from 'vue'
import VueEvents from 'vue-events'

Vue.use(VueEvents)
// Take a look at https://www.npmjs.com/package/vue-events for more information

export const activeFeatureChanged = 'active-feature-changed'
export const activeThemeChanged = 'active-theme-changed'
export const featuresChanged = 'features-changed'
export const enableGlobeNavigation = 'enable-globe-navigation'
export const disableGlobeNavigation = 'disable-globe-navigation'

export default {
  activeFeatureChanged,
  activeThemeChanged,
  featuresChanged,
  enableGlobeNavigation,
  disableGlobeNavigation
}
