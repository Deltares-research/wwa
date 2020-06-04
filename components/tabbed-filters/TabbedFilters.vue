<template>
  <div class="tabbed-filters layout-section">
    <div class="layout-section__container">
      <ul
        role="tablist"
        class="list--inline"
      >
        <li
          v-for="filter in filters"
          :key="filter.slug"
          role="presentation"
        >
          <a
            :id="`tab-${filter.slug}`"
            :href="`#section-${filter.slug}`"
            role="tab"
            :tabindex="currentTab === `tab-${filter.slug}` ? '0' : '-1'"
            :aria-selected="currentTab === `tab-${filter.slug}` ? 'true' : 'false'"
            @click.prevent="selectTab(`tab-${filter.slug}`)"
            @keydown="keyboardNavigation(filter.slug, $event)"
            :class="{ 'tabbed-filters__tab--selected' : filter.slug === activeFilterSlug }"
            ref="tab"
          >
            <span class="tabbed-filters__title--desktop">{{ filter.title }}</span>
            <span class="tabbed-filters__title--mobile">{{ filter.shortTitle }}</span>
          </a>
        </li>
      </ul>
      <section
        v-for="filter in filters"
        :key="filter.slug"
        :id="`section-${filter.slug}`"
        role="tabpanel"
        tabindex="-1"
        :aria-labelledby="`tab-${filter.slug}`"
        :hidden="currentTab !== `tab-${filter.slug}`"
        ref="panel"
      >
        <ul class="list--inline">
          <li
            v-for="filterItem in filter.filterItems"
            :key="filterItem.slug"
          >
            <nuxt-link
              :to="`/${filter.slug}/${filterItem.slug}`"
              :class="{ 'tabbed-filters__link--selected' : filterItem.slug === activeFilterItemSlug }"
            >
              {{ filterItem.title }}
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
      return this.$route.path.split('/')[1]
    },
    activeFilterItemSlug () {
      return this.$route.path.split('/')[2]
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
.tabbed-filters {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 75vh;
  background: red;
}

.tabbed-filters__title--mobile {
  display: block;
}

.tabbed-filters__title--desktop {
  display: none;
}

.tabbed-filters__tab--selected {
  font-weight: bold;
}

.tabbed-filters__link--selected {
  border: 1px solid blue;
}

@media (min-width: 768px) {
  .tabbed-filters__title--mobile {
    display: none;
  }

  .tabbed-filters__title--desktop {
    display: block;
  }
}
</style>
