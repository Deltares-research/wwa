<template>
  <div>
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
          :class="{
            'globe-component--right': globePositionRight,
            'globe-component--tall': highlightedEvent,
          }"
        />
      </transition>

      <div
        :class="{ 'globe-spacing--tall': highlightedEvent }"
        class="globe-spacing"
      >
        <transition name="fadeIn">
          <globe-navigation
            v-if="!globePositionRight && !isFilterPage"
            ref="globeNavigation"
          />
        </transition>

        <nuxt />
      </div>
    </main>

    <app-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MainMenu from '~/components/main-menu/MainMenu';
import GlobeHeader from '~/components/globe-header/GlobeHeader';
import GlobeNavigation from '~/components/globe-navigation/GlobeNavigation';
import AppFooter from '~/components/app-footer/AppFooter';

export default {
  async middleware ({ store, redirect }) {
    const app = await import('~/static/data/app.json');
    store.commit('setFilters', app.default.filters);
    store.commit('setDescription', app.default.description);
    store.commit('setHighlightedEvent', app.default.highlightedEvent);
    store.commit('setNavigationLinks', app.default.navigationLinks);
  },
  beforeCreate () {
    this.GlobeComponent = () => ({
      component: import(/* webpackChunkName: "globe-component" */'~/components/globe-component/GlobeComponent.vue'),
    });
  },
  components: { MainMenu, GlobeHeader, GlobeNavigation, AppFooter },
  computed: {
    ...mapState(['globePositionRight', 'highlightedEvent']),
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
  top: 4rem;
  transform: none;
  transition: transform 0.5s ease-in-out;
}

.globe-component--tall {
  top: 9rem;
}

@media (min-width: 600px) {
  .globe-component {
    top: 0rem;
  }

  .globe-component--tall {
    top: 5rem;
  }
}

.globe-spacing {
  position: relative;
  margin-top: var(--globe-spacing-default);
}

.globe-spacing--tall {
  margin-top: var(--globe-spacing-tall);
}

@media (min-width: 600px) {
  .globe-spacing {
    margin-top: var(--globe-spacing-default--desktop);
  }

  .globe-spacing--tall {
    margin-top: var(--globe-spacing-tall--desktop);
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
