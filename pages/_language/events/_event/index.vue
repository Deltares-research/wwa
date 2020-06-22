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

    <main>
      <div
        v-for="section in internalEvent.sections"
        :key="section.id"
        class="event-section"
        :class="{
          'event-section--background-black': section.backgroundColor === 'black',
          'event-section--background-blue': section.backgroundColor === 'blue',
        }"
      >
        <img
          class="event-section__divider"
          src="/event-section-wave.svg"
          width="111"
          height="35"
          alt=""
        >
        <section class="event__layout event__layout--padded event-section__body">
          <img
            v-if="section.waveMarker"
            class="event-section__divider"
            src="/event-section-wave.svg"
            width="111"
            height="35"
            alt=""
          >
          <h3
            class="event-section__title"
            :class="{
              'event-section__title--orange': section.titleColor === 'orange',
              'event-section__title--blue': section.titleColor === 'blue',
            }"
          >
            {{ section.title }}
          </h3>
          <img
            v-if="section.image"
            class="event-section__image"
            :src="`${section.image.url}?auto=compress`"
            :alt="section.image.alt"
            width="320"
          >
          <span
            class="event-section__copy"
            v-html="section.body"
          />
          <ul
            v-if="section.chapters.length"
            class="event__relevant-chapters"
          >
            <li
              class="chapter-preview"
              v-for="chapter in section.chapters"
              :key="chapter.slug"
            >
              <nuxt-link
                class="chapter-preview__link"
                :to="chapter.slug"
                append
              >
                <img
                  class="chapter-preview__image"
                  v-if="chapter.cover"
                  width="200"
                  height="200"
                  :src="`${chapter.cover.url}?auto=compress&w=400`"
                  alt=""
                >
                <h4 class="chapter-preview__title">
                  {{ chapter.title }}
                </h4>
              </nuxt-link>
            </li>
          </ul>
        </section>
      </div>
      <section>
        <ul
          v-for="speaker in internalEvent.speakers"
          :key="speaker.id"
        >
          <li class="speaker-card">
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
              </div>
            </div>
            <p class="speaker-card__subject">
              {{ speaker.subject }}
            </p>
          </li>
        </ul>
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
      const query = `
        {
          internalEvent(locale: ${params.language}, filter: { slug: { eq: "${params.event}" } }) {
            slug
            name
            location
            timezone
            displayDate
            image {
              url
            }

            _allNameLocales {
              locale
            }

            sections {
              id
              title
              titleColor
              body(markdown: true)
              backgroundColor
              waveMarker
              image {
                url
                alt
              }
              chapters {
                slug
                title
                cover {
                  url
                }
              }
            }

            speakers {
              id
              name
              organization
              subject
              image {
                url
              }
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
  .event__layout {
    max-width: 60rem;
    margin-right: auto;
    margin-left: auto;
  }

  .event__layout--padded {
    padding-right: 1.2rem;
    padding-left: 1.2rem;
  }

  @media (min-width: 38rem) {
    .event__layout--padded {
      padding-right: 2.4rem;
      padding-left: 2.4rem;
    }
  }

  .event-section--background-black {
    background-color: var(--black);
  }

  .event-section--background-blue {
    background-color: var(--primary-blue);
  }

  .event-section__body {
    padding-top: 3.4rem;
    padding-bottom: 3.4rem;
  }

  .event-section__divider {
    margin-bottom: 0.2rem;
  }

  .event-section__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  @media (min-width: 38rem) {
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
    margin-bottom: 1.4rem;
  }

  .event-section__copy p {
    display: inline-block;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  .event__relevant-chapters {
    display: flex;
    overflow-x: scroll;
  }

  .chapter-preview {
    display: block;
    background: var(--primary-blue);
  }

  .chapter-preview__link {
    position: relative;
    display: block;
  }

  .chapter-preview__image {
    object-fit: cover;
  }

  .chapter-preview__title {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0.6rem;
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
</style>
