<template>
  <div class="event">
    <header class="event-header">
      <div class="event-header__intro">
        <h1 class="event__name">
          <span class="event__location">{{ event.location }}</span>
          {{ event.name }}
        </h1>
        <nav class="language-switch">
          <ul class="language-switch__list">
            <li
              v-for="{ locale } in event._allNameLocales"
              :key="locale"
            >
              <nuxt-link
                class="language-switch__link"
                :class="{ 'language-switch__link--active': params.language === locale }"
                rel="alternate"
                :hreflang="locale"
                :lang="locale"
                :to="`/${locale}/events/${params.event}`"
              >
                {{ locale }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="event-header__body">
        <h2 class="event-header__copy">
          <span class="event-header__date">
            <time :datetime="event.startDate">{{ new Date(event.startDate).getDate() }}</time>  -
            <time :datetime="event.endDate">{{ new Date(event.endDate).getDate() }}</time>
            July 2020 ({{ event.timezone }})
          </span>
          <span class="event-header__title">
            {{ event.location }} {{ event.name }}
          </span>
        </h2>
      </div>
    </header>
    <main class="event__body">
      <aside class="wwa-mention">
        <img class="wwa-mention__image" src="/favicon-96x96.png" width="32" height="32" alt="">
        <p class="wwa-mention__body">
          <span>This contribution is part of</span>
          <a>The World Water Atlas</a>
        </p>
      </aside>
      <section
        v-for="section in event.sections"
        :key="section.id"
      >
        <h3 class="event-section__title">{{ section.title }}</h3>
        <img
          class="event-section__image"
          :src="`${section.image.url}?auto=compress`"
          :alt="section.image.alt"
          width="320"
        >
        <span class="event-section__body" v-html="section.body"></span>
        <ul class="event__relevant-chapters">
          <li
            class="chapter-preview"
            v-for="chapter in section.chapters"
            :key="chapter.slug"
          >
            <nuxt-link class="chapter-preview__link" :to="chapter.slug" append>
              <img
                class="chapter-preview__image"
                v-if="chapter.cover"
                width="200"
                height="200"
                :src="`${chapter.cover.url}?auto=compress&w=400`"
                alt=""
              >
              <h4 class="chapter-preview__title">{{ chapter.title }}</h4>
            </nuxt-link>
          </li>
        </ul>
      </section>
      <section>
        <ul v-for="speaker in event.speakers" :key="speaker.id">
          <li class="speaker-card">
            <div class="speaker-card__header">
              <img :src="`${speaker.image.url}?auto=compress&w=60`" width="60" height="60" alt="">
              <div class="speaker-card__copy">
                <h4 class="speaker-card__name">{{ speaker.name }}</h4>
                <p class="speaker-card__organization">{{ speaker.organization }}</p>
              </div>
            </div>
            <p class="speaker-card__subject">{{ speaker.subject }}</p>
          </li>
        </ul>
      </section>
    </main>
  </div>
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
          event(locale: ${params.language}, filter: { slug: { eq: "${params.event}" } }) {
            slug
            name
            location
            timezone
            startDate
            endDate

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
      }
    }
  }
</script>

<style>
  .event {
    color: var(--ui--white);
  }

  .event-header {
    display: flex;
    flex-direction: column;
  }

  .event-header__intro {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--ui--black);
  }

  .event__name {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 1rem;
  }

  .event__location {
    display: block;
    color: var(--yl-gn-bu--2-5);
  }

  .event-header__body {
    background: var(--yl-gn-bu--1-5);
    color: var(--ui--blue);
    padding: 1.4rem;
  }

  .event-header__copy {
    display: flex;
    flex-direction: column;
  }

  .event-header__date {
    font-weight: normal;
  }

  .event-header__title {
    font-size: 1.8rem;
  }

  .event__body {
    padding: 0.6rem;
  }

  .wwa-mention {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .wwa-mention__image {
    margin-right: 0.6rem;
  }

  .wwa-mention__body {
    display: flex;
    flex-direction: column;
  }

  .event-section__title {
    font-size: 2rem;
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
    background: var(--ui--blue);
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
    background-color: var(--yl-gn-bu--3-5);
    padding: 1rem;
  }

  .speaker-card__header {
    display: flex;
  }

  .speaker-card__copy {
    margin-left: 1rem;
  }

  .language-switch__list {
    display: flex;
    list-style-type: none;
  }

  .language-switch__link {
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }

  .language-switch__link--active {
    background-color: var(--ui--blue--bg);
    font-weight: 500;
  }
</style>
