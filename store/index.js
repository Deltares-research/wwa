import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    strict: true,
    state: {
      activeFeature: null,
      features: [],
      globeInteraction: true,
      theme: 'too-much',
      globeAutoRotation: true
    },
    mutations: {
      activateFeature (state, feature) {
        const { theme, location, slug, path } = feature
        state.activeFeature = { location, slug, path, theme }
      },
      deactivateFeature (state, feature) {
        state.activeFeature = undefined
      },
      replaceTheme (state, theme) {
        state.theme = theme
      },
      replaceFeatures (state, features) {
        state.features = features
      },
      disableInteraction (state) {
        state.globeInteraction = false
      },
      enableInteraction (state) {
        state.globeInteraction = true
      },
      enableGlobeAutoRotation (state, value) {
        state.globeAutoRotation = value
      }
    }
  })
}

export default store
