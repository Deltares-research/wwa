<template>
  <div>
    <header>
      <event-header
        :name="internalEvent.name"
        :location="internalEvent.location"
        :all-locales="internalEvent._allNameLocales"
      />

      <event-banner v-bind="internalEvent" />
    </header>

    <main class="event__body">
      <section
        v-for="section in internalEvent.sections"
        :key="section.id"
        class="event-section"
      >
        <img
          class="event-section__divider"
          src="/event-section-wave.svg"
          width="111"
          height="35"
          alt=""
        >
        <h3 class="event-section__title">
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
          class="event-section__body"
          v-html="section.body"
        />
        <ul class="event__relevant-chapters">
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

            _allNameLocales {
              locale
            }

            sections {
              id
              title
              body(markdown: true)
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
  .event__body {
    padding: 0.6rem;
  }

  .event-section {
    margin-bottom: 2rem;
  }

  .event-section__divider {
    margin-bottom: 0.2rem;
  }

  .event-section__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .event-section__image {
    margin-bottom: 1rem;
  }

  .event-section__body {
    margin-bottom: 1.4rem;
  }

  .event__relevant-chapters {
    display: flex;
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
