<template>
  <div>
    <page-header
      :icon-url="feature.icon.url"
      :title="feature.title"
      :hero-image-url="feature.heroImage.url"
    />

    <section-blocks
      :sections="feature.sections"
    />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import PageHeader from '~/components/page-header/PageHeader';
  import SectionBlocks from '~/components/section-blocks/SectionBlocks';

  export default {
    layout: 'static-page-dark',
    components: {
      PageHeader,
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
