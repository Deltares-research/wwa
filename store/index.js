import Vuex from 'vuex';
import loadData from '~/lib/load-data';

const store = () => {
  return new Vuex.Store({
    strict: true,
    state: {
      activeFeature: null,
      description: '',
      features: [],
      highlightedEvent: null,
      navigationLinks: [],
      rotate: true,
      zoom: true,
      globeInteraction: true,
      theme: 'too-much',
      globeAutoRotation: true,
      globePositionRight: false,
      filters: [],
      books: [],
    },
    actions: {
      async getBooks({ commit }) {
        const books = await loadData(this, { book: 'index' });
        commit('setBooks', books);
      }
    },
    mutations: {
      activateFeature (state, feature) {
        const { theme, location, slug, path } = feature;
        state.activeFeature = { location, slug, path, theme };
      },
      deactivateFeature (state) {
        state.activeFeature = undefined;
      },
      replaceTheme (state, theme) {
        state.theme = theme;
      },
      replaceFeatures (state, features) {
        state.features = features;
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
      setBooks (state, books) {
        state.books = books;
      },
    },
  });
};

export default store;
