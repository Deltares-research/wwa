<template>
  <div class="chapter">
    <header>
      <event-header v-bind="event" />
    </header>

    <main>
      <h2>{{ chapter.title }}</h2>
      <p>{{ chapter.body }}</p>
    </main>
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import eventHeader from '~/components/event-header';

  export default {
    components: {
      eventHeader,
    },
    head ({ params }) {
      return {
        htmlAttrs: {
          lang: params.language,
        },
      };
    },
    async asyncData({ params }) {
      const query = `
        {
          chapter(locale: ${params.language}, filter: { slug: { eq: "${params.chapter}" } }) {
            title
            body
          }

          event(locale: ${params.language}, filter: { slug: { eq: "${params.event}" } }) {
            name
            location
            _allNameLocales {
              locale
            }
          }
        }
      `;

      return {
        ...await fetchContent(query),
        params,
      };
    },
  }
</script>

<style>
  .chapter {
    font-family: sans-serif;
  }
</style>
