<template>
  <div class="invert">
    <hero-header :body="body" ></hero-header>
    <div class="globe-spacer"/>

    <theme-switch :themes="themes" :active-slug="slug" />
    <div
      class="layout-section layout-section--gradient"
      id="scrollToBooksList">
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
import ChapterList from '~/components/chapter-list/ChapterList'
import HeroHeader from '~/components/hero-header/HeroHeader'
import ThemeSwitch from '~/components/theme-switch/ThemeSwitch'

export default {
  components: { BookList, ChapterList, HeroHeader, ThemeSwitch },
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
      slug: ''
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.markers)
    this.$store.commit('enableInteraction')
    this.$store.commit('enableGlobeAutoRotation')
    this.$store.commit('enableNavBackgroundTrans')
  },
  destroyed () {
    this.$store.commit('disableNavBackgroundTrans')
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
</style>
