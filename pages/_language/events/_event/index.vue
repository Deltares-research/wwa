<template>
  <div class="event">
    <header class="layout-section__container">
      <animator
        :delay="0"
        :is-intersection-disabled="true"
      >
        <event-header
          :name="internalEvent.name"
          :slug="internalEvent.slug"
          :image="internalEvent.image"
          :event-website="internalEvent.eventWebsite"
          :all-locales="internalEvent._allNameLocales"
        />
      </animator>

      <animator :is-intersection-disabled="true">
        <event-banner v-bind="internalEvent" />
      </animator>
    </header>

    <main class="event__content">
      <SectionBlocks :sections="internalEvent.eventSections" />
    </main>
    <event-footer v-bind="internalEvent" />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';

  import EventBanner from '~/components/event-banner/EventBanner';
  import EventHeader from '~/components/event-header/EventHeader';
  import EventFooter from '~/components/event-footer/EventFooter';
  import query from './index.graphql';
  import Animator from '~/components/animator/Animator';
  import SectionBlocks from '~/components/section-blocks/SectionBlocks';

  export default {
    components: {
      SectionBlocks,
      EventBanner,
      EventHeader,
      EventFooter,
      Animator,
    },
    head ({ params }) {
      return {
        htmlAttrs: {
          lang: params.language,
        },
      };
    },
    async asyncData({ params }) {
      const data = await fetchContent({ query, variables: { locale: params.language, slug: params.event } });
      return { ...data, params };
    },
    mounted () {
      this.$store.commit('disableGlobePositionRight');
    },
  };
</script>

<style>
  .event-block__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  @media (--md-viewport) {
    .event-block__title {
      font-size: 3.75rem;
    }
  }
</style>
