<template>
  <div class="chapter">
    <header>
      <event-header
        :name="internalEvent.name"
        :location="internalEvent.location"
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
  import query from './_chapter.graphql';

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
      const data = await fetchContent({ query, variables: {
        locale: params.language,
        chapterSlug: params.chapter,
        eventSlug: params.event,
      }});
      return { ...data, params };
    },
  };
</script>

<style>
  .chapter {
    font-family: sans-serif;
  }
</style>
