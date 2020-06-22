<template>
  <div class="globe-navigation layout-section">
    <div class="layout-section__container">
      <h1 class="globe-navigation__header">
        Explore Atlas by
      </h1>

      <div class="globe-navigation__tabs">
        <ul
          class="globe-navigation__tabs-list list--inline"
          ref="tabsList"
        >
          <li
            v-for="filter in filters"
            :key="filter.slug"
            class="globe-navigation__tab"
            :class="{ 'globe-navigation__tab--selected' : filter.slug === activeFilterSlug }"
          >
            <nuxt-link
              :to="`/${filter.slug}`"
              class="globe-navigation__tab-link"
              ref="tabLink"
            >
              {{ filter.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <section>
        <ul class="globe-navigation__tags list--inline">
          <li
            v-for="currentFilter in currentFilters"
            :key="currentFilter.slug"
            class="globe-navigation__tag"
          >
            <filter-tag
              :title="currentFilter.title"
              :url="`/${activeFilterSlug}/${currentFilter.slug}`"
              :icon="currentFilter.icon"
              :is-selected="currentFilter.slug === activeFilterItemSlug"
            />
          </li>
        </ul>

        <template>
          <h1 class="sr-only">
            {{ filterTitle }}
          </h1>

          <div
            v-if="filterDescription"
            v-html="filterDescription"
            class="globe-navigation__description"
          />
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import renderMarkedContent from '~/lib/marked';
import FilterTag from '~/components/filter-tag/FilterTag';
import { mapState } from 'vuex';

export default {
  components: {
    FilterTag,
  },
  data () {
    return {
      position: null,
      tabsList: null,
      tabLinks: null,
    };
  },
  computed: {
    ...mapState(['filters']),
    activeFilter () {
      return this.filters.find(filter => filter.slug === this.activeFilterSlug);
    },
    activeFilterItem () {
      return this.currentFilters.find(filter => filter.slug === this.activeFilterItemSlug);
    },
    activeFilterSlug () {
      const slug = this.$route.path.split('/')[1] ? this.$route.path.split('/')[1] : this.filters[0].slug;
      return slug;
    },
    activeFilterItemSlug () {
      return this.$route.path.split('/')[2];
    },
    currentFilters () {
      const activeFilters = this.filters.find(filter => filter.slug === this.activeFilterSlug);
      return activeFilters ? activeFilters.filterItems : [];
    },
    filterDescription () {
      const description = this.activeFilterItemSlug ? this.activeFilterItem.description : this.activeFilter.description;
      return renderMarkedContent(description);
    },
    filterTitle () {
      return this.activeFilterItemSlug ? this.activeFilterItem.title : this.activeFilter.title;
    },
  },
  mounted () {
    this.tabsList = this.$refs.tabsList;
    this.tabLinks = this.$refs.tabLink;

    this.handleResize();

    window.addEventListener('resize', debounce(this.handleResize), 1000);
  },
  methods: {
    handleResize () {
      const elementWidth = this.tabsList.offsetWidth;
      const contentWidth = this.tabsList.scrollWidth;

      if (contentWidth > elementWidth) {
        this.tabsList.addEventListener('mousedown', this.handleDrag);
      } else {
        this.tabsList.removeEventListener('mousedown', this.handleDrag);
      }
    },
    handleDrag (event) {
      this.tabsList.style.cursor = 'grabbing';
      this.tabsList.style.userSelect = 'none';

      this.position = {
        left: this.tabsList.scrollLeft,
        x: event.clientX,
      };

      document.addEventListener('mousemove', this.handleDragMouseMove);
      document.addEventListener('mouseup', this.handleDragMouseUp);
    },
    handleDragMouseMove (event) {
      this.tabLinks.forEach(tabLink => {
        tabLink.$el.style.pointerEvents = 'none';
      });

      const dx = event.clientX - this.position.x;
      this.tabsList.scrollLeft = this.position.left - dx;
    },
    handleDragMouseUp () {
      this.tabsList.removeAttribute('style');

      this.tabLinks.forEach(tabLink => {
        tabLink.$el.removeAttribute('style');
      });

      document.removeEventListener('mousemove', this.handleDragMouseMove);
      document.removeEventListener('mouseup', this.handleDragMouseUp);
    },
  },
};
</script>

<style>
:root {
  --gradient-size: 20px;
}

.globe-navigation {
  padding-top: 1rem;
  background: linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 1) 150px, rgba(8, 8, 8, 1) 100%);
}

.globe-navigation__header {
  font-size: 12px;
  text-transform: uppercase;
}

.globe-navigation__tabs {
  position: relative;
  margin: 0 calc(-1 * var(--gradient-size));
}

.globe-navigation__tabs:before,
.globe-navigation__tabs:after {
  content: '';
  z-index: 1;
  position: absolute;
  display: block;
  top: 0;
  width: var(--gradient-size);
  height: 100%;
}

.globe-navigation__tabs:before {
  left: 0;
  background: linear-gradient(90deg, #000127 29.17%, rgba(0, 1, 39, 0) 100%);
}

.globe-navigation__tabs:after {
  right: 0;
  background: linear-gradient(270deg, #000127 29.17%, rgba(0, 1, 39, 0) 100%);
}

.globe-navigation__tabs-list {
  position: relative;
  justify-content: space-between;
  display: flex;
  padding: 1rem var(--gradient-size);
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none
}

.globe-navigation__tabs-list::-webkit-scrollbar {
  display: none;
}

li.globe-navigation__tab {
  flex-shrink: 0;
  margin-right: 2rem;
  padding-bottom: .25rem;
  border-bottom: 2px solid transparent;
}

li.globe-navigation__tab:last-child {
  padding-right: var(--gradient-size);
}

li.globe-navigation__tab--selected {
  border-bottom: 2px solid var(--tertiary-blue);
}

.globe-navigation__tab-link {
  font-size: 1rem;
  text-decoration: none;
}

@media (--sm-viewport) {
  .globe-navigation__tab-link {
    font-size: 1.25rem;
  }
}

.globe-navigation__tab--selected .globe-navigation__tab-link {
  font-weight: bold;
  color: var(--tertiary-blue);
}

.globe-navigation__tab--selected .globe-navigation__tab-link:hover {
  color: var(--tertiary-blue);
}

.globe-navigation__tags {
  margin-bottom: 1rem;
}

li.globe-navigation__tag {
  margin-bottom: .5rem;
}

@media (--sm-viewport) {
  li.globe-navigation__tag {
    margin-right: .75rem;
    margin-bottom: .75rem;
  }
}

.globe-navigation__description {
  margin-bottom: 3rem;
  font-size: 1rem;
  line-height: 1.5;
}

.globe-navigation__description p {
  margin-bottom: .5rem;
}

.globe-navigation__description p:last-child {
  margin-bottom: 0;
}

@media (--sm-viewport) {
  .globe-navigation__description {
    max-width: 66%;
  }
}
</style>
