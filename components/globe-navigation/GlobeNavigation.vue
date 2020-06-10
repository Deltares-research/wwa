<template>
  <div class="globe-navigation layout-section">
    <div class="layout-section__container">
      <ul class="list--inline">
        <li
          v-for="filter in filters"
          :key="filter.slug"
        >
          <nuxt-link
            :to="`/${filter.slug}`"
            :class="{ 'globe-navigation__tab--selected' : filter.slug === activeFilterSlug }"
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
            <nuxt-link
              :to="`/${activeFilterSlug}/${currentFilter.slug}`"
              :class="{ 'globe-navigation__link--selected' : currentFilter.slug === activeFilterItemSlug }"
            >
              {{ currentFilter.title }}
            </nuxt-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
      return this.filters.find(filter => filter.slug === this.activeFilterSlug).filterItems
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
  left: 0;
  top: 60vh;
  background: red;
}

.globe-navigation__title--mobile {
  display: block;
}

.globe-navigation__title--desktop {
  display: none;
}

.globe-navigation__tab--selected {
  font-weight: bold;
}

.globe-navigation__link--selected {
  border: 1px solid blue;
}

@media (min-width: 768px) {
  .globe-navigation__title--mobile {
    display: none;
  }

  .globe-navigation__title--desktop {
    display: block;
  }
}
</style>
