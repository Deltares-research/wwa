export const state = () => ({
  activeFeature: undefined,
  theme: undefined,
  features: [],
  enableInteraction: true
})

export const mutations = {
  activateFeature (state, feature) {
    const { theme, location, slug, path } = feature
    state.activeFeature = { location, slug, path, theme }
    if (theme && theme.slug) {
      state.theme = theme.slug
    }
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
