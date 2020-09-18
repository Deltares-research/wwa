<template>
  <div
    class="globe-navigation layout-section"
  >
    <span
      id="globe-navigation"
      class="globe-navigation__achor-jumper"
    />
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
            v-for="currentFilter in availableFilterItems"
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
            :class="{ 'globe-navigation__description--spacing-small': filterFeature }"
          />

          <nuxt-link
            v-if="filterFeature"
            :to="`/curated/${filterFeature.slug}`"
            class="globe-navigation__feature-link"
          >
            Explore {{ filterFeature.title }}
          </nuxt-link>
        </template>
      </section>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce';
  import getChapterSlugsByFilter from '~/lib/get-chapter-slugs-by-filter';
  import getChapterSlugsByFilterItem from '~/lib/get-chapter-slugs-by-filter-item';
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
        debounceFunction: debounce(this.handleResize),
      };
    },
    computed: {
      ...mapState(['chapters', 'filters']),
      activeFilter () {
        return this.filters.find(filter => filter.slug === this.activeFilterSlug);
      },
      activeFilterItem () {
        return this.availableFilterItems.find(filter => filter.slug === this.activeFilterItemSlug);
      },
      activeFilterSlug () {
        const slug = this.$route.path.split('/')[1] ? this.$route.path.split('/')[1] : this.filters[0].slug;
        return slug;
      },
      activeFilterItemSlug () {
        return this.$route.params.slug;
      },
      availableFilterItems () {
        const availableFilters = this.filters.find(filter => filter.slug === this.activeFilterSlug);
        return availableFilters ? availableFilters.filterItems : [];
      },
      filterDescription () {
        const description = this.activeFilterItemSlug
          ? this.activeFilterItem ? this.activeFilterItem.description : ''
          : this.activeFilter ? this.activeFilter.description : '';
        return description;
      },
      filterFeature () {
        const feature = this.activeFilterItemSlug
          ? this.activeFilterItem ? this.activeFilterItem.feature : ''
          : this.activeFilter ? this.activeFilter.feature : '';
        return feature;
      },
      filterTitle () {
        return this.activeFilterItemSlug
          ? this.activeFilterItem ? this.activeFilterItem.title : ''
          : this.activeFilter ? this.activeFilter.title : '';
      },
    },
    created() {
      this.$store.commit('setAvailableFilterItems', this.availableFilterItems);
      if (this.activeFilterSlug && !this.activeFilterItemSlug) {
        const markerTypes = getChapterSlugsByFilter(this.chapters, this.activeFilterSlug);
        this.$store.commit('setMarkerTypes', markerTypes);
      } else if (this.activeFilterSlug && this.activeFilterItemSlug) {
        const markerTypes = getChapterSlugsByFilterItem(this.chapters, this.activeFilterItemSlug);
        this.$store.commit('setMarkerTypes', markerTypes);
      }
    },
    mounted () {
      this.tabsList = this.$refs.tabsList;
      this.tabLinks = this.$refs.tabLink;

      this.handleResize();

      window.addEventListener('resize', this.debounceFunction, 1000);
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.debounceFunction, 1000);
    },
    watch: {
      activeFilterSlug(newValue) {
        this.$store.commit('setAvailableFilterItems', this.availableFilterItems);
        const markerTypes = getChapterSlugsByFilter(this.chapters, newValue);
        this.$store.commit('setMarkerTypes', markerTypes);
      },
      activeFilterItemSlug (newValue) {
        if (newValue) {
          const markerTypes = getChapterSlugsByFilterItem(this.chapters, newValue);
          this.$store.commit('setMarkerTypes', markerTypes);

          if (newValue === 'too-much' || newValue === 'too-dirty' || newValue === 'too-little') {
            this.$store.commit('replaceTheme', newValue);
          } else {
            this.$store.commit('resetTheme');
          }
        }
      },
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

  .globe-navigation__achor-jumper {
    position: absolute;
    top: -300px;
  }

  .globe-navigation__header {
    font-size: .75rem;
    font-weight: 500;
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
    border-bottom: 2px solid var(--blue-tertiary);
  }

  .globe-navigation__tab-link {
    text-decoration: none;
  }

  @media (--sm-viewport) {
    .globe-navigation__tab-link {
      font-size: 1.25rem;
    }
  }

  .globe-navigation__tab--selected .globe-navigation__tab-link {
    font-weight: bold;
    color: var(--blue-tertiary);
  }

  .globe-navigation__tab--selected .globe-navigation__tab-link:hover {
    color: var(--blue-tertiary);
  }

  .globe-navigation__tags {
    display: flex;
    flex-wrap: wrap;
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
    line-height: 1.5;
  }

  .globe-navigation__description--spacing-small {
    margin-bottom: 1rem;
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

  .globe-navigation__feature-link {
    display: inline-flex;
    align-items: center;
    margin-bottom: 3rem;
    padding: .3rem .9rem .3rem 1rem;
    min-height: 2rem;
    background: var(--black-secondary);
    border-radius: 5px;
    font-size: .825rem;
    font-weight: bold;
    text-decoration: none;
    color: var(--white);
  }

  .globe-navigation__feature-link:hover,
  .globe-navigation__feature-link:focus {
    color: var(--white);
  }

  .globe-navigation__feature-link:after {
    content: '';
    display: block;
    margin-left: .4rem;
    width: 10px;
    height: 10px;
    background-image: url('~assets/arrow-right--white.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
</style>
