<template>
  <div class="event">
    <header class="event__layout">
      <event-header
        :name="internalEvent.name"
        :slug="internalEvent.slug"
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
              v-if="block._modelApiKey === 'text_block'"
              :key="block.id"
              class="event__layout event__layout--padded"
            >
              <event-block-text v-bind="block" />
            </div>
            <div
              v-if="block._modelApiKey === 'media_block'"
              :key="block.id"
              class="event__layout event__layout--padded"
            >
              <event-block-text-media v-bind="block" />
            </div>
            <div
              v-if="block._modelApiKey === 'related_stories_block'"
              :key="block.id"
              class="event__layout event__layout--padded"
            >
              <event-block-related-stories v-bind="block" />
            </div>
            <div
              v-if="block._modelApiKey === 'chapters_block'"
              :key="block.id"
              class="event__layout event__layout--padded"
            >
              <event-block-chapters
                :title="block.title"
                :items="block.chapters"
              />
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
  import EventBlockChapters from '~/components/event-block/EventBlockChapters';
  import EventBlockText from '~/components/event-block/EventBlockText';
  import EventBlockTextMedia from '~/components/event-block/EventBlockTextMedia';
  import EventBlockRelatedStories from '~/components/event-block/EventBlockRelatedStories';
  import EventHeader from '~/components/event-header/EventHeader';
  import EventFooter from '~/components/event-footer/EventFooter';

  export default {
    components: {
      EventBanner,
      EventBlockChapters,
      EventBlockText,
      EventBlockTextMedia,
      EventBlockRelatedStories,
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
            visuallyHideName
            timezone
            displayDate
            image {
              url
            }
            bannerIcon {
              url
              width
              height
            }
            bannerTagline

            _allNameLocales {
              locale
            }

            eventSections {
              backgroundColor
              showBottomWave
              showTopWave

              blocks {
                ... on ChaptersBlockRecord {
                  _modelApiKey
                  id
                  title
                  chapters {
                    title
                    slug
                    cover {
                      url
                    }
                  }
                }
                ... on TextBlockRecord {
                  _modelApiKey
                  id
                  title
                  titleColor
                  showWaveMarker
                  body(markdown: true)
                  callToActionLabel
                  callToActionUrl
                }
                ... on MediaBlockRecord {
                  _modelApiKey
                  id
                  title
                  titleColor
                  showWaveMarker
                  programButtonLabel
                  body(markdown: true)
                  callToActionLabel
                  callToActionUrl
                  mirrorLayout
                  image {
                    alt
                    portrait: responsiveImage(imgixParams: {auto: compress, w: "550", h: "660", fit: crop, crop: entropy}) {
                      src
                      srcSet
                      sizes
                    }
                    landscape: responsiveImage(imgixParams: {auto: compress, w: "600", h: "270", fit: crop, crop: entropy}) {
                      srcSet
                      sizes
                    }
                  }
                }
                ... on RelatedStoriesBlockRecord {
                  _modelApiKey
                  id
                  title
                  subtitle
                  titleColor
                  showWaveMarker
                  linkedChapters {
                    id
                    book {
                      slug
                    }
                    chapter {
                      slug
                      title
                      cover {
                        url(imgixParams: {auto: compress, w: "500", fit: crop, crop: entropy})
                      }
                    }
                  }
                }
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
