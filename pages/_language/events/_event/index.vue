<template>
  <div class="event">
    <header class="event__layout">
      <animator
        :delay="0"
        :is-intersection-disabled="true"
      >
        <event-header
          :name="internalEvent.name"
          :slug="internalEvent.slug"
          :image="internalEvent.image"
          :event-website="internalEvent.eventWebsite"
          :all-locales="internalEvent._allNameLocales"
        />
      </animator>

      <animator :is-intersection-disabled="true">
        <event-banner v-bind="internalEvent" />
      </animator>
    </header>

    <main class="event__content">
      <SectionBlocks :sections="internalEvent.eventSections" />
    </main>
    <event-footer v-bind="internalEvent" />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';

  import EventBanner from '~/components/event-banner/EventBanner';
  import EventHeader from '~/components/event-header/EventHeader';
  import EventFooter from '~/components/event-footer/EventFooter';
  import Animator from '~/components/animator/Animator';
  import SectionBlocks from '~/components/section-blocks/SectionBlocks'

  export default {
    components: {
      SectionBlocks,
      EventBanner,
      EventHeader,
      EventFooter,
      Animator,
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
            eventWebsite
            visuallyHideName
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
                  slug
                  chapters {
                    title
                    slug
                    cover {
                      url
                    }
                  }
                }
                ... on ColofonBlockRecord {
                  _modelApiKey
                  id
                  title
                  slug
                  titleColor
                  showWaveMarker
                  body(markdown: true)
                  logos {
                    id
                    url
                    alt
                  }
                }
                ... on TextBlockRecord {
                  _modelApiKey
                  id
                  title
                  slug
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
                  slug
                  titleColor
                  showWaveMarker
                  internalButtonLabel
                  internalButtonSlug
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
                  slug
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
                        url
                      }
                    }
                  }
                }
                ... on SpeakersBlockRecord {
                  _modelApiKey
                  id
                  showWaveMarker
                  subtitle
                  title
                  slug
                  titleColor
                  speakers {
                    id
                    name
                    organization
                    subject
                    subjectLabel
                    image {
                      url
                    }
                  }
                }
                ... on ScheduleBlockRecord {
                  _modelApiKey
                  id
                  slug
                  timezone
                  timezoneComment
                  topicLabel
                  scheduleLabel
                  nowLabel
                  descriptionLabel
                  speakersLabel
                  eventDays {
                    id
                    date
                    scheduleItems {
                      id
                      title
                      topic
                      startTime
                      endTime
                      description
                      watchLabel
                      watchUrl
                      speakers {
                        id
                        name
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
    mounted () {
      this.$store.commit('disableGlobePositionRight');
    },
  };
</script>

<style>
  .event-block__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  @media (--md-viewport) {
    .event-block__title {
      font-size: 3.75rem;
    }
  }
</style>
