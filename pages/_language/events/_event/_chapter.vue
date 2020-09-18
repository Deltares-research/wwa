<template>
  <div class="event">
    <header class="layout-section__container">
      <event-header
        :name="internalEvent.name"
        :slug="internalEvent.slug"
        :image="internalEvent.image"
        :event-website="internalEvent.eventWebsite"
        :all-locales="internalEvent._allNameLocales"
      />
    </header>

    <main class="event__content">
      <div class="layout-section__container layout-section__container--padded">
        <narrative-header-event
          :chapter="chapter"
          :back-button-label="internalEvent.backButtonLabel"
          :chapter-navigation-label="internalEvent.chapterNavigationLabel"
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

    <event-footer v-bind="internalEvent" />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import SectionBlockText from '~/components/section-blocks/SectionBlockText';
  import eventHeader from '~/components/event-header/EventHeader';
  import NarrativeHeaderEvent from '~/components/narrative-header/NarrativeHeaderEvent';
  import StoryMap from '~/components/story-map/StoryMap';
  import ResponsiveImage from '~/components/responsive-image/ResponsiveImage';
  import ResponsiveVideo from '~/components/responsive-video/ResponsiveVideo';
  import SectionBlockCredits from '~/components/section-blocks/SectionBlockCredits';
  import eventFooter from '~/components/event-footer/EventFooter';

  export default {
    components: {
      eventHeader,
      NarrativeHeaderEvent,
      StoryMap,
      ResponsiveImage,
      ResponsiveVideo,
      SectionBlockText,
      SectionBlockCredits,
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
              storyteller
              body(markdown: true)
              images {
                id
                url
                width
                height
                title
                alt
              }
              video {
                url
                provider
                providerUid
                width
                height
              }
              videoChina
              mapboxStyle
              creditsTitle
              creditsBody(markdown: true)
              creditsLogos {
                url
                alt
              }
            }
          }

          internalEvent(locale: ${params.language}, filter: { slug: { eq: "${params.event}" } }) {
            name
            eventWebsite
            backButtonLabel
            chapterNavigationLabel
            image {
              url
            }
            _allNameLocales {
              locale
            }
          }
        }
      `;

      const content = await fetchContent(query);
      content.chapter.pages.map(page => {
        if (page.videoChina) {
          const providerUid = /^https:\/\/v\.qq\.com\/x\/page\/([a-z0-9]+)\.html$/.exec(page.videoChina)[1];
            page.video = {
              provider: 'qq',
              providerUid,
            };
        }
      });

      return {
        ...content,
        params,
      };
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
