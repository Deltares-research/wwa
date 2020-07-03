<template>
  <div class="event">
    <header class="event__layout">
      <event-header
        :name="internalEvent.name"
        :slug="internalEvent.slug"
        :image="internalEvent.image"
        :all-locales="internalEvent._allNameLocales"
      />
    </header>

    <main class="event-section event__content">
      <div class="event__layout event__layout--padded">
        <narrative-header-event
          :chapter="chapter"
          @scrollTo="smoothScroll"
        />
      </div>

      <article
        v-for="page in chapter.pages"
        :key="page.slug"
        :ref="page.slug"
        class="event__layout event__layout--padded"
      >
        <h2>{{ page.title }}</h2>
        {{ page.body }}
      </article>
    </main>

    <event-footer v-bind="internalEvent" />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import eventHeader from '~/components/event-header/EventHeader';
  import NarrativeHeaderEvent from '~/components/narrative-header/NarrativeHeaderEvent';
  import eventFooter from '~/components/event-footer/EventFooter';

  export default {
    components: {
      eventHeader,
      NarrativeHeaderEvent,
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
      const query = `
        {
          chapter(locale: ${params.language}, filter: { slug: { eq: "${params.chapter}" } }) {
            title
            cover {
              responsiveImage(imgixParams: {auto: compress, w: 1120, h: 360}) {
                src
                srcSet
                sizes
              }
            }
            pages {
              slug
              title
              body
            }
          }

          internalEvent(locale: ${params.language}, filter: { slug: { eq: "${params.event}" } }) {
            name
            image {
              url
            }
            _allNameLocales {
              locale
            }
          }
        }
      `;

      return {
        ...await fetchContent(query),
        params,
      };
    },
    methods: {
      smoothScroll (slug) {
        const element = this.$refs[slug][0];
        const domRect = element.getBoundingClientRect();
        window.scrollBy({ top: domRect.y - 16, behavior: 'smooth' });
      },
    },
  };
</script>
