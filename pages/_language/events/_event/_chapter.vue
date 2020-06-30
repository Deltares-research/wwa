<template>
  <div class="chapter">
    <header>
      <event-header
        :name="internalEvent.name"
        :slug="internalEvent.slug"
        :image="internalEvent.image"
        :all-locales="internalEvent._allNameLocales"
      />
    </header>

    <main>
      <h2>{{ chapter.title }}</h2>
      <p>{{ chapter.body }}</p>
    </main>

    <event-footer v-bind="internalEvent" />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import eventHeader from '~/components/event-header/EventHeader';
  import eventFooter from '~/components/event-footer/EventFooter';

  export default {
    components: {
      eventHeader,
      eventFooter,
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

          internalEvent(locale: ${params.language}, filter: { slug: { eq: "${params.event}" } }) {
            name
            image {
              url
            }
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
  };
</script>

<style>
  .chapter {
    font-family: sans-serif;
  }
</style>
