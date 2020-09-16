<template>
  <div class="features-page">
    <ul class="flat-list">
      <li
        v-for="feature in features"
        :key="feature.id"
      >
        <nuxt-link :to="feature.path">
          {{ feature.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    layout: 'static-page-dark',
    async asyncData (context) {
      const data = await import('~/static/data/features/index.json');
      return {
        features: data.default,
      };
    },
  };
</script>

<style>
  .features-page {
    margin: 0 auto;
    max-width: var(--wwa-column-width);
  }
</style>
