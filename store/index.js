import Vuex from 'vuex';
import getBookChaptersByFilter from '~/lib/get-book-chapters-by-filter';
import getBookChaptersByFilterItem from '~/lib/get-book-chapters-by-filter-item';
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
      activeFilter: null,
      activeFilterItem: null,
      books: [],
    },
    getters: {
      filteredChapters: (state) => {
        if (state.activeFilter === 'event') {
          return [{ slug: 'event'}];
        } else if (state.activeFilter && !state.activeFilterItem) {
          return getBookChaptersByFilterItem(state.books, state.activeFilter);
        } else if (state.activeFilter && state.activeFilterItem) {
         return getBookChaptersByFilter(state.books, state.activeFilterItem);
        } else {
          return state.books.map(book => book.chapters).flat();
        }
      },
      filteredChapterSlugs(state, getters) {
        return getters.filteredChapters.map(chapter => chapter.slug);
      },
    },
    actions: {
      async getBooks({ commit }) {
        const books = await import('~/static/data/books/index.json');
        commit('setBooks', books.default);
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
      setBooks (state, books) {
        state.books = books;
      },
      setActiveFilterItem (state, activeFilterItem) {
        state.activeFilterItem = activeFilterItem;
      },
      setActiveFilter (state, activeFilter) {
        state.activeFilter = activeFilter;
      },
    },
  });
};

export default store;
