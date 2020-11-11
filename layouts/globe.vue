<template>
  <div>
    <div
      ref="skipLink"
      tabindex="-1"
    >
      <skip-link target="main-content" />
    </div>

    <main-menu variant="dark" />

    <main id="main-content">
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
            v-if="!globePositionRight && !isFilterPage && !isEventPage"
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
  import SkipLink from '~/components/skip-link/SkipLink';
  import MainMenu from '~/components/main-menu/MainMenu';
  import GlobeHeader from '~/components/globe-header/GlobeHeader';
  import GlobeNavigation from '~/components/globe-navigation/GlobeNavigation';
  import AppFooter from '~/components/app-footer/AppFooter';

  export default {
    async middleware ({ store }) {
      const app = await import('~/static/data/app.json');
      await store.dispatch('getChapters');
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
    components: { SkipLink, MainMenu, GlobeHeader, GlobeNavigation, AppFooter },
    computed: {
      ...mapState(['globePositionRight', 'highlightedEvent']),
      isFilterPage () {
        return this.$route.name === 'keywords-slug' || this.$route.name === 'keywords';
      },
      isEventPage () {
        return this.$route.name === 'events';
      },
    },
    watch: {
      $route: function() {
        this.$nextTick(function() {
          this.$refs.skipLink.focus();
        });
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

  @media (--vertical-viewport) {
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

  @media (--vertical-viewport) {
    .globe-spacing {
      margin-top: var(--globe-spacing-default--desktop);
    }

    .globe-spacing--tall {
      margin-top: var(--globe-spacing-tall--desktop);
    }
  }

  @media (--lg-viewport) {
    .globe-component--right {
      transform: translateX(33%);
    }
  }

  @media (--xl-viewport) {
    .globe-component--right {
      transform: translateX(25%);
    }
  }
</style>
