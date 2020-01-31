import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    strict: true,
    state: {
      activeFeature: null,
      features: [],
      rotate: true,
      zoom: true,
      globeInteraction: true,
      theme: 'too-much',
      globeAutoRotation: true,
      globePositionRight: false,
      navBackgroundTrans: false,
      backButtonText: undefined
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
      disableRotate (state) {
        state.rotate = false
      },
      enableRotate (state) {
        state.rotate = true
      },
      disableZoom (state) {
        state.zoom = false
      },
      enableZoom (state) {
        state.zoom = true
      },
      disableInteraction (state) {
        state.zoom = false
        state.rotate = false
      },
      enableInteraction (state) {
        state.zoom = true
        state.rotate = true
      },
      disableGlobeAutoRotation (state) {
        state.globeAutoRotation = false
      },
      enableGlobeAutoRotation (state) {
        state.globeAutoRotation = true
      },
      disableGlobePositionRight (state) {
        state.globePositionRight = false
      },
      enableGlobePositionRight (state) {
        state.globePositionRight = true
      },
      disableNavBackgroundTrans (state) {
        state.navBackgroundTrans = false
      },
      enableNavBackgroundTrans (state) {
        state.navBackgroundTrans = true
      },
      setBackButtonToHome (state) {
        state.backButtonText = 'home'
      },
      setBackButtonToArrow (state) {
        state.backButtonText = 'arrow'
      },
      hideBackButton (state) {
        state.backButtonText = undefined
      }
    }
  })
}

export default store
