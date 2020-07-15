import Vuex from 'vuex';
const DEFAULT_THEME = 'too-much';

const store = () => {
  return new Vuex.Store({
    strict: true,
    state: {
      activeFeature: null,
      description: '',
      highlightedEvent: null,
      navigationLinks: [],
      rotate: true,
      zoom: true,
      globeInteraction: true,
      theme: DEFAULT_THEME,
      globeAutoRotation: true,
      globePositionRight: false,
      filters: [],
      chapters: [],
      markerTypes: [],
    },
    actions: {
      async getChapters({ commit }) {
        const chapters = await import('~/static/data/chapters/index.json');
        commit('setChapters', chapters.default);
      },
    },
    mutations: {
      activateFeature (state, feature) {
        const { theme, location, slug, path } = feature;
        state.activeFeature = { location, slug, path, theme };
        state.theme = feature.theme ? feature.theme.slug : DEFAULT_THEME;
      },
      deactivateFeature (state) {
        state.activeFeature = undefined;
      },
      replaceTheme (state, theme) {
        state.theme = theme;
      },
      resetTheme (state) {
        state.theme = DEFAULT_THEME;
      },
      disableRotate (state) {
        state.rotate = false;
      },
      enableRotate (state) {
        state.rotate = true;
      },
      disableZoom (state) {
        state.zoom = false;
      },
      enableZoom (state) {
        state.zoom = true;
      },
      disableInteraction (state) {
        state.zoom = false;
        state.rotate = false;
      },
      enableInteraction (state) {
        state.zoom = true;
        state.rotate = true;
      },
      disableGlobeAutoRotation (state) {
        state.globeAutoRotation = false;
      },
      enableGlobeAutoRotation (state) {
        state.globeAutoRotation = true;
      },
      disableGlobePositionRight (state) {
        state.globePositionRight = false;
      },
      enableGlobePositionRight (state) {
        state.globePositionRight = true;
      },
      setDescription (state, description) {
        state.description = description;
      },
      setHighlightedEvent (state, highlightedEvent) {
        state.highlightedEvent = highlightedEvent;
      },
      setNavigationLinks (state, navigationLinks) {
        state.navigationLinks = navigationLinks;
      },
      setFilters (state, filters) {
        state.filters = filters;
      },
      setChapters (state, chapters) {
        state.chapters = chapters;
      },
      setMarkerTypes (state, markerTypes) {
        state.markerTypes = markerTypes;
      },
    },
  });
};

export default store;
