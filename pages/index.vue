<template>
  <div class="invert">
    <div data-hero-hide-trigger />
    <hero-header
      :body="body"
      :showHeroHeader="showHeroHeader"
      v-on:hideHeroHeader="showHeroHeader = false"
    />
    <div class="globe-spacer"/>

    <div class="layout-section layout-section--no-padding layout-section--gradient">
      <theme-switch :themes="themes" :active-slug="slug" />
    </div>
    <div class="layout-section layout-section--grey-trans">
      <book-tags
        class="layout-section__container"
        :books="books"
        @selectLink="smoothScroll"
      />
    </div>
    <video-highlights
      id="scrollToBooksList"
      :videoHighlights="videoHighlights"
    />
    <div class="layout-section layout-section--blue-trans">
      <book-list class="layout-section__container" :books="books">
        <chapter-list slot-scope="{ chapters, limit }" :chapters="chapters" sorted="newest" :limit="limit" />
      </book-list>
    </div>
  </div>
</template>

<script>
import loadData from '~/lib/load-data'
import marked from '~/lib/custom-marked'

import home from '~/static/data/home.json'

import BookList from '~/components/book-list/BookList'
import BookTags from '~/components/book-tags/BookTags'
import ChapterList from '~/components/chapter-list/ChapterList'
import HeroHeader from '~/components/hero-header/HeroHeader'
import ThemeSwitch from '~/components/theme-switch/ThemeSwitch'
import VideoHighlights from '~/components/video-highlights/VideoHighlights'

export default {
  components: { BookList, BookTags, ChapterList, HeroHeader, ThemeSwitch, VideoHighlights },
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const books = await loadData(context, { book: 'index' })

    const markers = books
      .reduce((a, b) => a.concat(b.chapters), []) // flatten array
      .filter(marker => marker.location)

    return { books, markers, themes: await themes }
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
@import "../components/colors/colors.css";

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
