<template>
  <main>
    <main-menu variant="dark" />

    <globe-header />

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
import { mapState } from 'vuex';
import MainMenu from '~/components/main-menu/MainMenu';
import GlobeHeader from '~/components/globe-header/GlobeHeader';
import GlobeNavigation from '~/components/globe-navigation/GlobeNavigation';

export default {
  async middleware ({ store, redirect }) {
    const app = await import('~/static/data/app.json');
    store.commit('setFilters', app.default.filters);
    store.commit('setDescription', app.default.description);
    store.commit('setHighlightedEvent', app.default.highlightedEvent);
  },
  beforeCreate () {
    this.GlobeComponent = () => ({
      component: import(/* webpackChunkName: "globe-component" */'~/components/globe-component/GlobeComponent.vue'),
    });
  },
  components: { MainMenu, GlobeHeader, GlobeNavigation },
  computed: {
    ...mapState(['globePositionRight']),
    isFilterPage () {
      return this.$route.name === 'keywords-slug';
    },
  },
};
</script>

<style>
.globe-component {
  position: fixed;
  z-index: -10;
  top: 9rem;
  transform: none;
  transition: transform 0.5s ease-in-out;
}

@media (min-width: 600px) {
  .globe-component {
    top: 5rem;
  }
}

.globe-spacing {
  margin-top: 90vh;
}

@media (min-width: 600px) {
  .globe-spacing {
    margin-top: 85vh;
  }
}

@media (min-width: 1024px) {
.globe-component--right {
    transform: translateX(33%);
  }
}

@media (min-width: 1440px) {
  .globe-component--right {
    transform: translateX(25%);
  }
}
</style>
