<template>
  <div>
    <img
      :src="feature.icon.url"
      alt=""
    >

    <h1>{{ feature.title }}</h1>

    <button
      type="button"
      @click="goBack"
    >
      Back
    </button>

    <section-blocks :sections="feature.sections" />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import { mapState } from 'vuex';
  import SectionBlocks from '~/components/section-blocks/SectionBlocks';

  export default {
    layout: 'static-page-dark',
    components: {
      SectionBlocks,
    },
    async asyncData({ params }) {
      const query = `
          {
            feature(filter: { slug: { eq: "${params.slug}" } }) {
              slug
              title
              icon {
                url
              }
              sections {
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
      };
    },
    computed: {
      ...mapState(['historyAvailable']),
    },
    methods: {
      goBack () {
        this.historyAvailable ? this.$router.back() : this.$router.push('/');
      },
    },
  };
</script>
