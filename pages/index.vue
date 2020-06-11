<template>
  <div class="invert">
    <div data-hero-hide-trigger />
    <hero-header
      :body="body"
      :showHeroHeader="showHeroHeader"
      v-on:hideHeroHeader="showHeroHeader = false"
    />

    <video-highlights :videoHighlights="videoHighlights" />
    <div class="globe-section layout-section">
      <book-list class="layout-section__container" :books="books">
        <chapter-list slot-scope="{ chapters, limit }" :chapters="chapters" sorted="newest" :limit="limit" />
      </book-list>
    </div>
  </div>
</template>

<script>
import loadData from '~/lib/load-data'
import marked from '~/lib/custom-marked'
import flattenDeep from 'lodash/flattenDeep'
import home from '~/static/data/home.json'

import BookList from '~/components/book-list/BookList'
import ChapterList from '~/components/chapter-list/ChapterList'
import HeroHeader from '~/components/hero-header/HeroHeader'
import VideoHighlights from '~/components/video-highlights/VideoHighlights'

export default {
  layout: 'globe',
  components: { BookList, ChapterList, HeroHeader, VideoHighlights },
  async asyncData (context) {
    const books = await loadData(context, { book: 'index' })

    const chaptersNested = await Promise.all([
      ...books.map(book => {
        return book.chapters.map(chapter => {
          return loadData(context,
            {
              chapter: {
                path: `books/${book.slug}/chapters/${chapter.slug}/index.json`
              }
            })
        })
      })
    ])

    const chaptersFlattend = flattenDeep(chaptersNested)
    const chapters = await Promise.all(chaptersFlattend)
    const markers = flattenDeep(chapters.map(chapter => chapter.pages))
      .filter(page => page.location && page.theme && page.path)

    return { books, markers }
  },
  data: function () {
    return {
      body: marked(home.body),
      videoHighlights: home.videoHighlights,
      slug: '',
      showHeroHeader: true
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.markers)
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
.globe-section {
  background-color: rgba(0,0,42,.85);
  padding-top: 1rem;
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
