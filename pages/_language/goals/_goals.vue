<template>
  <div class="invert">
    <div class="globe-spacer-goal" />
    <div class="layout-section">
      <div class="layout-section__container">
        <h1>Sustainable Development Goals </h1>
        <ul class="list--inline goal-filter">
          <li v-for="link in allGoals" :key="link.slug">
            <nuxt-link
              class="sdg-tag sdg-tag--filter sdg-tag--large"
              :style="{ backgroundImage: `url('assets/E_SDG-goals_icons-individual-rgb-${link.slug.slice(0,2)}.png')` }"
              :to="link.slug"
              :title="link.title"
            >
              <span class="sr-only">{{ link.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="layout-section layout-section--gradient">
      <div class="layout-section__container">
        <chapter-list :chapters="results" sorted="newest" :limit="32" />
      </div>
    </div>
  </div>
</template>

<script>
import fetchContent from '~/lib/fetch-content';
import flattenDeep from 'lodash/flattenDeep'

import ChapterList from '~/components/chapter-list/ChapterList'

export default {
  async asyncData ({ params }) {
    const data = await fetchContent(`
      {
        allGoals(locale: ${params.language}, orderBy: id_ASC) {
          slug
          title
        }

        allBooks(locale: ${params.language}) {
          slug

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
              location {
                lat: latitude
                lon: longitude
              }
              goal {
                slug
              }
            }
          }
        }
      }
    `);

    return {
      ...data,
      results:
        data.allBooks.reduce((chapters, book) => {
          if (book.chapters.length === 0) return chapters;

          book.chapters.forEach(chapter => {
            chapter.pages.forEach(page => {
              if (page.goal.findIndex(x => x.slug === params.goals) !== -1)
                chapters.push({...chapter, bookSlug: book.slug, location: page.location})
            })
          })
          return chapters
        }, [])
      // results: flattenDeep(
      //   data.allBooks
      //     .filter(book => book.chapters.pages && book.chapters.pages.find(page => page.goal.includes(params.goals)))
      //     .map(book => book.chapters)
      // )
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.results)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: {
    ChapterList
  }
}
</script>

<style>
@import "../../../components/tag/tag.css";

.globe-spacer-goal {
  height: 60vh;
  width: 100vw;
  pointer-events: none;
}

</style>
