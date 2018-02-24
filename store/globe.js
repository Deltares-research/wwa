export const state = () => ({
  activeFeature: undefined,
  theme: undefined,
  features: [],
  enableInteraction: true
})

export const mutations = {
  activateFeature (state, feature) {
    state.activeFeature = feature
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
    state.enableInteraction = false
  },
  enableInteraction (state) {
    state.enableInteraction = true
  }
}
