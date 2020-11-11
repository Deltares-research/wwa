<template>
  <div>
    <div
      ref="skipLink"
      tabindex="-1"
    >
      <skip-link target="main-content" />
    </div>

    <main class="layout-static-page layout-static-page--light">
      <main-menu variant="light" />
      <nuxt id="main-content" />
    </main>
  </div>
</template>

<script>
import SkipLink from '~/components/skip-link/SkipLink';
import MainMenu from '~/components/main-menu/MainMenu';

export default {
  async middleware ({ store }) {
    const app = await import('~/static/data/app.json');
    store.commit('setDescription', app.default.description);
    store.commit('setNavigationLinks', app.default.navigationLinks);
  },
  components: { SkipLink, MainMenu },
  watch: {
    $route: function() {
      this.$nextTick(function() {
        this.$refs.skipLink.focus();
      });
    },
  },
};
</script>
