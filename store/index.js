import Vuex from 'vuex';
import getBookChaptersByFilter from '~/lib/get-book-chapters-by-filter';
import getBookChaptersByFilterItem from '~/lib/get-book-chapters-by-filter-item';

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
      activeFilter: null,
      activeFilterItem: null,
      books: [],
      activeKeywordSlugs: [],
    },
    getters: {
      filteredChapters: (state) => {
        if (state.activeFilter && !state.activeFilterItem) {
          return getBookChaptersByFilterItem(state.books, state.activeFilter);
        } else if (state.activeFilter && state.activeFilterItem) {
         return getBookChaptersByFilter(state.books, state.activeFilterItem);
        } else if (state.activeKeywordSlugs.length){
          return state.books;
        } else {
          return state.books;
        }
      },
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
      setActiveFilterItem (state, activeFilterItem) {
        state.activeFilterItem = activeFilterItem;
      },
      setActiveFilter (state, activeFilter) {
        state.activeFilter = activeFilter;
      },
      setActiveKeywordSlugs (state, keywords) {
        state.activeKeywords = keywords;
      },
      addActiveKeywordSlug (state, keyword) {
        state.activeKeywordSlugs.push(keyword);
      },
    },
  });
};

export default store;
