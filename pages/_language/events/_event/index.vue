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
          :all-locales="internalEvent.allLocales"
        />
      </animator>

      <animator :is-intersection-disabled="true">
        <event-banner v-bind="internalEvent" />
      </animator>
    </header>

    <main class="event__content">
      <SectionBlocks :sections="internalEvent.sections" />
    </main>
    <event-footer v-bind="internalEvent" />
  </div>
</template>

<script>
  import EventBanner from '~/components/event-banner/EventBanner';
  import EventHeader from '~/components/event-header/EventHeader';
  import EventFooter from '~/components/event-footer/EventFooter';
  import SectionBlocks from '~/components/section-blocks/SectionBlocks';
  import Animator from '~/components/animator/Animator';

  export default {
    components: {
      SectionBlocks,
      EventBanner,
      EventHeader,
      EventFooter,
      Animator,
    },
    async asyncData({ params }) {
      const data = await import(`~/static/data/events/${params.language}/${params.event}.json`);
      return { internalEvent: data.default };
    },
    mounted () {
      this.$store.commit('disableGlobePositionRight');
    },
  };
</script>

<style>
  .section-block__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  @media (--md-viewport) {
    .section-block__title {
      font-size: 3.75rem;
    }
  }
</style>
