<template>
  <article>
    <h1 class="events-title">
      {{ newsArticle.title }}
    </h1>
    <time :datetime="newsArticle.date">{{ newsArticle.date }}</time>

    <section-blocks :sections="newsArticle.sections" />
  </article>
</template>

<script>
import fetchContent from '~/lib/fetch-content';
import SectionBlocks from '~/components/section-blocks/SectionBlocks';
export default {
  components: { SectionBlocks },
  layout: 'static-page-dark',
  async asyncData({ params }) {
    const query = `
        {
          newsArticle(filter: { slug: { eq: "${params.slug}" } }) {
            slug
            title
            date
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
};
</script>
