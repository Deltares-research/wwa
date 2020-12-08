<template>
  <div class="event">
    <skip-link target="main-content" />

    <header
      id="main-content"
      class="layout-section__container event__header"
    >
      <event-header
        :name="chapter.internalEvent.name"
        :slug="chapter.internalEvent.slug"
        :image="chapter.internalEvent.image"
        :event-website="chapter.internalEvent.eventWebsite"
        :all-locales="chapter.internalEvent.allLocales"
      />
    </header>

    <main class="event__content">
      <div class="layout-section__container layout-section__container--padded">
        <narrative-header-event
          :chapter="chapter"
          :back-button-label="chapter.internalEvent.backButtonLabel"
          :chapter-navigation-label="chapter.internalEvent.chapterNavigationLabel"
          @scrollTo="smoothScroll"
        />
      </div>

      <article
        v-for="(page, index) in chapter.pages"
        :key="page.slug"
        :ref="page.slug"
        class="event-chapter__article"
        :class="{ 'event-chapter__article--blue': index % 2 != 0}"
      >
        <div class="layout-section__container layout-section__container--padded">
          <div class="event-chapter__block">
            <section-block-text
              :show-wave-marker="true"
              :title="page.title"
              :subtitle="page.storyteller"
              title-color="white"
              :body="page.body"
              :show-small-title="true"
              :files="page.files"
              :show-heading-level-top="true"
            />
          </div>

          <div
            v-if="page.images && page.images.length"
            class="event-chapter__block event-chapter__block--images"
          >
            <figure
              v-for="image in page.images"
              :key="image.id"
              class="page-body__figure"
              :class="image.width / image.height < 1.5 ? 'page-body__figure--is-portrait' : null"
            >
              <responsive-image
                class="page-body__lazy-image"
                :src="`${image.url}?auto=compress,format&w=640&q=65`"
                :src-width="image.width"
                :src-height="image.height"
                :alt="image.alt"
                width="100%"
              />
              <figcaption
                v-if="image.title || image.value && image.value.title"
                class="event-chapter__caption"
              >
                {{ image.title || image.value && image.value.title }}
              </figcaption>
            </figure>
          </div>

          <div
            v-if="page.video"
            class="event-chapter__block"
          >
            <responsive-video :video="page.video" />
          </div>

          <div
            v-if="page.mapboxStyle"
            class="event-chapter__block"
          >
            <story-map :mapbox-style="page.mapboxStyle" />
          </div>

          <div
            v-if="page.creditsTitle || page.creditsBody || page.creditsLogos"
            class="event-chapter__block"
          >
            <section-block-credits
              :title="page.creditsTitle"
              :body="page.creditsBody"
              :logos="page.creditsLogos"
            />
          </div>
        </div>
      </article>
    </main>

    <event-footer v-bind="chapter.internalEvent" />
  </div>
</template>

<script>
  import seoHead from '~/lib/seo-head';
  import SkipLink from '~/components/skip-link/SkipLink';
  import SectionBlockText from '~/components/section-blocks/SectionBlockText';
  import EventHeader from '~/components/event-header/EventHeader';
  import NarrativeHeaderEvent from '~/components/narrative-header/NarrativeHeaderEvent';
  import StoryMap from '~/components/story-map/StoryMap';
  import ResponsiveImage from '~/components/responsive-image/ResponsiveImage';
  import ResponsiveVideo from '~/components/responsive-video/ResponsiveVideo';
  import SectionBlockCredits from '~/components/section-blocks/SectionBlockCredits';
  import eventFooter from '~/components/event-footer/EventFooter';

  export default {
    components: {
      SkipLink,
      EventHeader,
      NarrativeHeaderEvent,
      StoryMap,
      ResponsiveImage,
      ResponsiveVideo,
      SectionBlockText,
      SectionBlockCredits,
      eventFooter,
    },
    async asyncData({ params }) {
      const data = await import(`~/static/data/events/${params.language}/chapters/${params.chapter}.json`);
      return { chapter: data.default };
    },
    head() {
      return seoHead(this.chapter.seo, this.$route.path);
    },
    methods: {
      smoothScroll (slug) {
        const element = this.$refs[slug][0];
        const domRect = element.getBoundingClientRect();
        window.scrollBy({ top: domRect.y, behavior: 'smooth' });
      },
    },
  };
</script>

<style>
  .event__header.layout-section__container {
    margin-bottom: var(--spacing-half);
  }

  .event-chapter__article {
    padding: 1rem 0 2rem 0;
  }

  @media (--md-viewport) {
    .event-chapter__article {
      padding: 3rem 0;
    }
  }

  .event-chapter__article--blue {
    background: var(--blue-primary);
  }

  .event-chapter__block:not(:last-child),
  .event-chapter__block .page-body__figure:not(:last-child) {
    margin-bottom: 2rem;
  }

  .event-chapter__block--images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .event-chapter__block--images .page-body__figure {
    width: 100%;
  }

  @media (--sm-viewport) {
    .event-chapter__block--images .page-body__figure--is-portrait {
      width: 75%;
    }
  }

  @media (--md-viewport) {
    .event-chapter__block--images {
      justify-content: space-between;
    }

    .event-chapter__block--images .page-body__figure--is-portrait {
      width: calc(50% - 1rem);
    }
  }

  .event-chapter__caption {
    margin-top: .5rem;
  }
</style>
