<template>
  <div>
    <ul>
      <li
        v-for="feature in allFeatures"
        :key="feature.slug"
      >
        <nuxt-link :to="`/features/${feature.slug}`">
          {{ feature.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';

  export default {
    layout: 'static-page-dark',
    async asyncData () {
      const query = `
          {
            allFeatures {
              slug
              title
            }
          }
        `;

      return {
        ...await fetchContent(query),
      };
    },
  };
</script>
