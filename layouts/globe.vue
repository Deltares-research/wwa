<template>
  <main>
    <main-menu variant="dark" />

    <transition
      name="fadeIn"
      mode="out-in"
    >
      <globe-component
        :is="GlobeComponent"
        class="globe-component"
        :class="{ 'globe-component--right': globePositionRight }"
      />
    </transition>

    <div class="globe-spacing">
      <transition name="fadeIn">
        <globe-navigation
          v-if="!globePositionRight && !isFilterPage"
          ref="globeNavigation"
        />
      </transition>

      <nuxt />
    </div>
  </main>
</template>
<script>
import { mapState } from 'vuex'
import MainMenu from '~/components/main-menu/MainMenu'
import GlobeNavigation from '~/components/globe-navigation/GlobeNavigation'

export default {
  async middleware ({ store, redirect }) {
    const filters = await import('~/static/data/filters.json')
    store.commit('setFilters', filters.default)
  },
  beforeCreate () {
    this.GlobeComponent = () => ({
      component: import(/* webpackChunkName: "globe-component" */'~/components/globe-component/GlobeComponent.vue')
    })
  },
  components: { MainMenu, GlobeNavigation },
  computed: {
    ...mapState(['globePositionRight']),
    isFilterPage () {
      return this.$route.name === 'keywords-slug'
    }
  }
}
</script>

<style>
.globe-component {
  position: fixed;
  z-index: -10;
  top: 0;
  transform: none;
  transition: transform 0.5s ease-in-out;
}

.globe-spacing {
  margin-top: 75vh;
}

@media only screen and (min-width: 1024px) {
.globe-component--right {
    transform: translateX(33%);
  }
}

@media only screen and (min-width: 1440px) {
  .globe-component--right {
    transform: translateX(25%);
  }
}
</style>
