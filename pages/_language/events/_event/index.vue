<template>
  <main class="event">
    <h2 class="event__title">{{ event.title }}</h2>
    <nav>
      <ul>
        <li v-for="{ locale } in event._allTitleLocales" :key="locale">
          <nuxt-link
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

    <ul class="event__relevant-chapters">
      <li
        class="chapter-preview"
        v-for="chapter in event.relevantChapters"
        :key="chapter.slug"
      >
        <nuxt-link :to="chapter.slug" append>
          <img
            class="chapter-preview__image"
            v-if="chapter.cover"
            width="400"
            height="400"
            :src="`${chapter.cover.url}?auto=compress&w=800`"
            alt=""
          >
          <h3>{{ chapter.title }}</h3>
        </nuxt-link>
      </li>
    </ul>
  </main>
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
            title

            _allTitleLocales {
              locale
            }

            relevantChapters {
              slug
              title
              cover { url }
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
    color: white;
  }

  .event__title {
    display: flex;
    justify-content: center;
    font-size: 4rem;
  }

  .event__relevant-chapters {
    display: flex;
  }

  .event__relevant-chapters > * {
    margin: 1rem;
  }

  .chapter-preview {
    display: block;
    background: var(--ui--blue);
  }

  .chapter-preview__image {
    object-fit: cover;
  }
</style>
