<template>
  <main class="chapter">
    <h2>{{ chapter.title }}</h2>
    <p>{{ chapter.body }}</p>
  </main>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';

  export default {
    head ({ params }) {
      return {
        htmlAttrs: {
          lang: params.language,
        }
      }
    },
    async asyncData({ params }) {
      const query = `
        {
          chapter(locale: ${params.language}, filter: { slug: { eq: "${params.chapter}" } }) {
            title
            body
          }
        }
      `;

      return {
        ...await fetchContent(query),
        params,
      }
    }
  }
</script>

<style>
  .chapter {
    color: var(--ui--white);
  }
</style>
