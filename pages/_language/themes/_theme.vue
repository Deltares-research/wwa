<template>
  <div class="invert">
    <div class="globe-spacer-theme"></div>

    <div class="layout-section layout-section--no-padding layout-section--gradient">
      <theme-switch :themes="allThemes" :active-slug="slug" :language="language" />
    </div>
    <div
      class="layout-section layout-section--themes"
      :class="`layout-section--theme-${slug}-active`"
    >
      <div class="layout-section__container">
        <chapter-list :chapters="allChapters" sorted="newest" :limit="32" />
      </div>
    </div>
  </div>
</template>

<script>
import fetchContent from '~/lib/fetch-content';
import flattenDeep from 'lodash/flattenDeep'

import ChapterList from '~/components/chapter-list/ChapterList'
import ThemeSwitch from '~/components/theme-switch/ThemeSwitch'

export default {
  async asyncData ({ params }) {
    const query = `
      {
        allThemes(locale: ${params.language}) {
          slug
          title
          body
        }

        allChapters(locale: ${params.language}) {
          updatedAt
          slug
          cover {
            responsiveImage {
              src
            }
          }
          pages {
            theme {
              slug
              title
            }
            location {
              lat: latitude
              lon: longitude
            }
          }
        }

        allBooks(locale: ${params.language}, orderBy: createdAt_ASC) {
          slug
          title
          chapters {
            slug
            title
            updatedAt
            cover {
              responsiveImage {
                src
              }
            }
            pages {
              slug
              theme {
                slug
                title
              }
              location {
                lat: latitude
                lon: longitude
              }
            }
          }
        }
      }
    `;

    return {
      ...await fetchContent(query),
      slug: params.slug,
      language: params.language,
    }

  },
  mounted () {
    this.$store.commit('replaceFeatures',
      flattenDeep(
        this.allBooks.map(book => book.chapters.map(chapter => chapter.pages.map(page => ({ ...page, bookSlug: book.slug, chapterSlug: chapter.slug }))))
      )
        .filter(page => page.location && page.theme && page.theme.slug === this.$route.params.theme)
    )
    this.$store.commit('replaceTheme', this.$route.params.theme)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: { ChapterList, ThemeSwitch }
}
</script>

<style>
.globe-spacer-theme {
  height: 82vh;
  width: 100vw;
  pointer-events: none;
}
.layout-section--themes {
  padding-top: 1rem;
}
.layout-section--theme-too-much-active {
  background-color: var(--ui--bg--theme-too-much-dark-trans);
}
.layout-section--theme-too-little-active {
  background-color: var(--ui--bg--theme-too-little-dark-trans);
}
.layout-section--theme-too-dirty-active {
  background-color: var(--ui--bg--theme-too-dirty-dark-trans);
}
</style>
