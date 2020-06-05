<template>
  <main class="event">
    <h2 class="event__title">{{ event.title }}</h2>
    <nav>
      <ul>
        <li v-for="{ locale } in event._allTitleLocales" :key="locale">
          <a
            rel="alternate"
            :hreflang="locale"
            :lang="locale"
            :href="`/${locale}/events/${params.event}`"
          >
            {{ locale }}
          </a>
        </li>
      </ul>
    </nav>
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
</style>
