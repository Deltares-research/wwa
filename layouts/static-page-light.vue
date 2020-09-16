<template>
  <main class="layout layout--static-page">
    <main-menu variant="light" />
    <nuxt />
  </main>
</template>

<script>
import MainMenu from '~/components/main-menu/MainMenu';

export default {
  async middleware ({ store }) {
    const app = await import('~/static/data/app.json');
    store.commit('setDescription', app.default.description);
    store.commit('setNavigationLinks', app.default.navigationLinks);
  },
  components: { MainMenu },
};
</script>
