<template>
  <div class="event">
    <header class="event__layout">
      <event-header
        :name="internalEvent.name"
        :location="internalEvent.location"
        :image="internalEvent.image"
        :all-locales="internalEvent._allNameLocales"
      />

      <event-banner v-bind="internalEvent" />
    </header>

    <main class="event__content">
      <section
        v-for="(section, index) in internalEvent.eventSections"
        :key="section.id"
        class="event-section"
        :class="{
          'event-section--wave-top-black': section.showTopWave && section.backgroundColor === 'black',
          'event-section--wave-top-blue': section.showTopWave && section.backgroundColor === 'blue',
          'event-section--wave-bottom-black': section.showBottomWave && section.backgroundColor === 'black',
          'event-section--wave-bottom-blue': section.showBottomWave && section.backgroundColor === 'blue',
          'event-section--wave-top-bg-blue': section.showTopWave && internalEvent.eventSections[index - 1] && internalEvent.eventSections[index - 1].backgroundColor === 'blue',
          'event-section--wave-top-bg-black': section.showTopWave && internalEvent.eventSections[index - 1] && internalEvent.eventSections[index - 1].backgroundColor === 'black',
          'event-section--wave-bottom-bg-blue': section.showBottomWave && internalEvent.eventSections[index + 1] && internalEvent.eventSections[index + 1].backgroundColor === 'blue',
          'event-section--wave-bottom-bg-black': section.showBottomWave && internalEvent.eventSections[index + 1] && internalEvent.eventSections[index + 1].backgroundColor === 'black',
          'event__layout--background-black': section.backgroundColor === 'black',
          'event__layout--background-blue': section.backgroundColor === 'blue',
        }"
      >
        <div class="event-section__content">
          <template v-for="block in section.blocks">
            <div
              v-if="block._modelApiKey === 'media_block'"
              :key="block.id"
              class="event__layout event__layout--padded"
            >
              <img
                v-if="block.showWaveMarker"
                class="event-section__divider"
                src="/event-title-wave.svg"
                width="111"
                height="35"
                alt=""
              >
              <h3
                class="event-section__title"
                :class="{
                  'event-section__title--orange': block.titleColor === 'orange',
                  'event-section__title--blue': block.titleColor === 'blue',
                }"
              >
                {{ block.title }}
              </h3>
              <picture v-if="block.image">
                <source
                  :srcset="block.image.portrait.srcSet"
                  :sizes="block.image.portrait.sizes"
                  media="(min-width: 800px)"
                >
                <source
                  :srcset="block.image.landscape.srcSet"
                  :sizes="block.image.landscape.sizes"
                  media="(max-width: 800px)"
                >
                <img
                  class="event-section__image"
                  :src="block.image.portrait.src"
                  :width="block.image.portrait.width"
                  :alt="block.image.alt"
                >
              </picture>
              <div
                class="event-section__copy"
                v-html="block.body"
              />
            </div>
            <div
              v-if="block._modelApiKey === 'speakers_block'"
              :key="block.id"
              class="event__layout event__layout--padded"
            >
              <h3 class="event-section__title">
                {{ block.title }}
              </h3>

              <ul class="list--inline">
                <li
                  v-for="speaker in block.speakers"
                  class="speaker-card"
                  :key="speaker.id"
                >
                  <div class="speaker-card__header">
                    <img
                      :src="`${speaker.image.url}?auto=compress&fm=webp&mask=ellipse&w=60`"
                      width="60"
                      height="60"
                      alt=""
                    >
                    <div class="speaker-card__copy">
                      <h4 class="speaker-card__name">
                        {{ speaker.name }}
                      </h4>
                      <p class="speaker-card__organization">
                        {{ speaker.organization }}
                      </p>
                      <p class="speaker-card__subject">
                        {{ speaker.subject }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </section>
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

  export default {
    components: {
      EventBanner,
      EventHeader,
      EventFooter,
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
  };
</script>

<style>
  .event-section__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  @media (--sm-viewport) {
    .event-section__title {
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 1rem;
      max-width: 30rem;
    }

    @media (--sm-viewport) {
      .event-section__title {
        font-size: 3.75rem;
      }
    }

    .event-section__title--orange {
      color: var(--orange);
    }

    .event-section__title--blue {
      color: var(--tertiary-blue);
    }

    .event-section__image {
      margin-bottom: 1rem;
    }

    .event-section__copy {
      display: block;
      column-count: 2;
      column-width: 25rem;
      column-gap: 1.2rem;
    }

    .event-section__copy p {
      display: inline-block;
      margin-bottom: 1rem;
      max-width: 30rem;
    }

    .speaker-card {
      background-color: var(--tertiary-blue);
      padding: 1rem;
    }

    .speaker-card__header {
      display: flex;
    }

    .speaker-card__copy {
      margin-left: 1rem;
    }
  }
</style>
