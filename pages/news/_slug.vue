<template>
  <article>
    <page-header
      :title="newsArticle.title"
      :sub-title="formattedDate"
      :hero-image-url="newsArticle.heroImage.url"
    />

    <section-blocks :sections="newsArticle.sections" />
  </article>
</template>

<script>
import fetchContent from '~/lib/fetch-content';
import SectionBlocks from '~/components/section-blocks/SectionBlocks';
import PageHeader from '~/components/page-header/PageHeader';
export default {
  components: { PageHeader, SectionBlocks },
  layout: 'static-page-dark',
  async asyncData({ params }) {
    const query = `
        {
          newsArticle(filter: { slug: { eq: "${params.slug}" } }) {
            slug
            title
            date
            heroImage {
              url
            }
            sections {
              backgroundColor
              showBottomWave
              showTopWave

              blocks {
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
                ... on NewsBlockRecord {
                  _modelApiKey
                  id
                  title
                  slug
                  titleColor
                  showWaveMarker
                  newsArticles {
                    slug
                    title
                    date
                    heroImage {
                      url
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
    formattedDate() {
      return new Date(this.newsArticle.date).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    },
  },
};
</script>
