<template>
  <div class="invert">
    <div data-hero-hide-trigger />
    <hero-header
      :body="marked(home.body)"
      :showHeroHeader="showHeroHeader"
      v-on:hideHeroHeader="showHeroHeader = false"
    />
    <div class="globe-spacer"/>

    <div class="layout-section layout-section--no-padding layout-section--gradient">
      <theme-switch :themes="allThemes" :active-slug="slug" :language="language" />
    </div>
    <div class="layout-section layout-section--blue-trans">
      <book-tags
        class="layout-section__container"
        :books="allBooks"
        @selectLink="smoothScroll"
      />
    </div>
    <video-highlights
      id="scrollToBooksList"
      :videoHighlights="home.videoHighlights"
    />
    <div class="layout-section layout-section--blue-trans">
      <book-list class="layout-section__container" :books="allBooks" :path="path">
        <chapter-list slot-scope="{ chapters, limit }" :chapters="chapters" sorted="newest" :limit="limit" :path="language" />
      </book-list>
    </div>
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import marked from '~/lib/custom-marked'
  import flattenDeep from 'lodash/flattenDeep'

  import BookList from '~/components/book-list/BookList'
  import BookTags from '~/components/book-tags/BookTags'
  import ChapterList from '~/components/chapter-list/ChapterList'
  import HeroHeader from '~/components/hero-header/HeroHeader'
  import ThemeSwitch from '~/components/theme-switch/ThemeSwitch'
  import VideoHighlights from '~/components/video-highlights/VideoHighlights'

  export default {
    components: { BookList, BookTags, ChapterList, HeroHeader, ThemeSwitch, VideoHighlights },
    async asyncData ({ params, route }) {
      const query = `
        {
          home(locale: ${params.language}) {
            body
            videoHighlights {
              id
              title
              body
              url
              video {
                providerUid
              }
            }
          }

          allThemes(locale: ${params.language}) {
            slug
            title
            body
          }

          allBooks(locale: en, orderBy: createdAt_ASC) {
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
        path: route.path,
        language: params.language,
      }
    },
    data: function () {
      return {
        slug: '',
        showHeroHeader: true
      }
    },
    mounted () {
      this.$store.commit('replaceFeatures',
        flattenDeep(
          this.allBooks.map(book => book.chapters.map(chapter => chapter.pages.map(page => ({ ...page, bookSlug: book.slug, chapterSlug: chapter.slug }))))
        )
          .filter(page => page.location && page.theme)
      )
      this.$store.commit('enableInteraction')
      this.$store.commit('enableGlobeAutoRotation')
      this.$store.commit('enableNavBackgroundTrans')
      if (
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      ) {
        this.observeScrolledToTop()
      }
    },
    destroyed () {
      this.$store.commit('disableNavBackgroundTrans')
    },
    methods: {
      marked,
      observeScrolledToTop () {
        const trackVisibility = (entries) => {
          entries.forEach(entry => {
            this.showHeroHeader = entry.isIntersecting
          })
        }
        const observer = new IntersectionObserver(trackVisibility, {
          // No explicit root, we want the viewport
          rootMargin: '0% 0% 0% 0%',
          thresholds: 0
        })
        const triggerElement = this.$el.querySelector('[data-hero-hide-trigger]')
        observer.observe(triggerElement)
      },
      smoothScroll (slug) {
        const element = document.getElementById(slug)
        const domRect = element.getBoundingClientRect()
        window.scrollBy({ top: domRect.y - 100, behavior: 'smooth' })
      }
    }
  }
</script>

<style>
  @import "../../components/colors/colors.css";

  .globe-spacer {
    height: 82vh;
    width: 100vw;
    pointer-events: none;
  }

  [data-hero-hide-trigger] {
    display: block;
    position: absolute;
    top: 1rem;
    right: 0;
    width: 1px;
    height: 1px;
    background-color: transparent;
    z-index: 1;
  }
</style>
