<template>
  <div class="features-page">
    <img
      :src="`${feature.icon.imgixHost}/${feature.icon.value.path}`"
      alt=""
    >

    <h1>{{ feature.title }}</h1>

    <nuxt-link to="/">
      back
    </nuxt-link>

    <section
      v-for="section in feature.sections"
      :key="section.id"
    >
      <article
        v-for="block in section.blocks"
        :key="block.id"
      >
        {{ block.title }}
      </article>
    </section>
  </div>
</template>

<script>
  export default {
    layout: 'static-page-dark',
    async asyncData ({ route }) {
      const data = await import(`~/static/data/features/${route.params.slug}.json`);
      return {
        feature: data.default,
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
