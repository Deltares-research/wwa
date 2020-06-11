<template>
  <div class="globe-navigation layout-section">
    <div class="layout-section__container">
      <h1 class="globe-navigation__header">
        Explore Atlas by
      </h1>

      <ul class="globe-navigation__tabs list--inline">
        <li
          v-for="filter in filters"
          :key="filter.slug"
          class="globe-navigation__tab"
          :class="{ 'globe-navigation__tab--selected' : filter.slug === activeFilterSlug }"
        >
          <nuxt-link
            :to="`/${filter.slug}`"
            class="globe-navigation__tab-link"
          >
            {{ filter.title }}
          </nuxt-link>
        </li>
      </ul>
      <section>
        <ul class="list--inline">
          <li
            v-for="currentFilter in currentFilters"
            :key="currentFilter.slug"
          >
            <filter-tag
              :title="currentFilter.title"
              :url="`/${activeFilterSlug}/${currentFilter.slug}`"
              :isSelected="currentFilter.slug === activeFilterItemSlug"
              class="globe-navigation__tag"
            />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import FilterTag from '~/components/filter-tag/FilterTag'
import { mapState } from 'vuex'

export default {
  components: {
    FilterTag
  },
  data () {
    return {
      currentTab: null
    }
  },
  computed: {
    ...mapState(['filters']),
    activeFilterSlug () {
      const slug = this.$route.path.split('/')[1] ? this.$route.path.split('/')[1] : this.filters[0].slug
      return slug
    },
    activeFilterItemSlug () {
      return this.$route.path.split('/')[2]
    },
    currentFilters () {
      const activeFilters = this.filters.find(filter => filter.slug === this.activeFilterSlug)
      return activeFilters ? activeFilters.filterItems : []
    }
  },
  watch:{
    $route (){
      this.updateRouteInfo()
    }
  },
  methods: {
    selectTab (id) {
      this.currentTab = id
    },
    keyboardNavigation (slug, event) {
      const numberOfTabs = this.$refs.tab.length
      const index = this.$refs.tab.indexOf(event.srcElement)
      const keyDirection = event.which === 37 ? index - 1 : event.which === 39 ? index + 1 : event.which === 40 ? 'down' : null

      if(keyDirection !== null) {
        if(keyDirection === 'down') {
          this.$refs.panel[index].focus()
        } else if (keyDirection >= 0 && keyDirection < numberOfTabs) {
          this.currentTab = this.$refs.tab[keyDirection].id
          this.$refs.tab[keyDirection].focus()
        }
      }
    },
    updateRouteInfo () {
      this.currentTab = this.activeFilterSlug ? `tab-${this.activeFilterSlug}` : 'tab-themes'
    }
  },
  mounted () {
    this.updateRouteInfo()
  }
}
</script>

<style>
.globe-navigation {
  z-index: 1;
  position: absolute;
  padding-top: 1rem;
  padding-bottom: 1rem;
  left: 0;
  top: 75vh;
}

.globe-navigation__header {
  margin-bottom: 1rem;
  font-size: 12px;
  text-transform: uppercase;
}

.globe-navigation__tabs {
  justify-content: space-between;
  display: flex;
  margin-bottom: 1rem;
  overflow: auto;
}

li.globe-navigation__tab {
  flex-shrink: 0;
  margin-right: 2rem;
  padding-bottom: .25rem;
  border-bottom: 2px solid transparent;
}

li.globe-navigation__tab--selected {
  border-bottom: 2px solid var(--ui--blue--light);
}

.globe-navigation__tab-link {
  font-size: 1rem;
  text-decoration: none;
}

@media (min-width: 600px) {
  .globe-navigation__tab-link {
    font-size: 1.25rem;
  }
}

.globe-navigation__tab--selected .globe-navigation__tab-link {
  font-weight: bold;
  color: var(--ui--blue--light);
}

.globe-navigation__tab--selected .globe-navigation__tab-link:hover {
  color: var(--ui--blue--light);
}

.globe-navigation__tag {
  margin-bottom: .5rem;
}

@media (min-width: 600px) {
  .globe-navigation__tag {
    margin: 0 .3rem .8rem 0;
  }
}
</style>
