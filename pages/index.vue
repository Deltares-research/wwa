<template>
  <div class="invert">
    <div class="tagline" v-html="body"></div>
    <div class="globe-spacer"/>

    <video-highlights />
    <div class="page-index__scroll-to-wrapper">
      <span class="page-index__scroll-to-button" @click="smoothScroll('scrollToBooksList')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="page-index__button-icon">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
          <path fill="none" d="M0 0h24v24H0V0z"></path>
        </svg>
      </span>
    </div>
    <div
      class="page-index__book-list-wrapper"
      id="scrollToBooksList">
      <book-list class="page-index__book-list" :books="books">
        <chapter-list slot-scope="{ chapters }" :chapters="chapters" sorted="newest" :limit="3" />
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
import VideoHighlights from '~/components/video-highlights/VideoHighlights'

export default {
  components: { BookList, ChapterList, VideoHighlights },
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const books = await loadData(context, { book: 'index' })

    const markers = books
      .reduce((a, b) => a.concat(b.chapters), []) // flatten array
      .filter(marker => marker.location)

    return { books, markers, themes: await themes }
  },
  data () {
    const body = marked(home.body)
    return { body }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.markers)
    this.$store.commit('enableInteraction')
    this.$store.commit('enableGlobeAutoRotation')
  },
  methods: {
    smoothScroll (id) {
      const element = document.getElementById(id)
      const domRect = element.getBoundingClientRect()
      window.scrollBy({ top: domRect.y - 64, behavior: 'smooth' })
    }
  }
}
</script>

<style>
@import "../components/colors/colors.css";

.tagline {
  position: absolute;
  top: 5rem;
  margin-top: 5vw;
  width: 10rem;
  padding: 1rem;
}

.tagline::before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 10rem;
  background-image: var(--ui--left-gradient);
  overflow: visible;
  z-index: -1;
}

.tagline [href*='too-dirty'],
.tagline [href*='too-much'],
.tagline [href*='too-little'] {
  display: inline-block;
  padding-left: 1.25em;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 1em;
}
.tagline [href*='too-dirty'] {
  background-image: url('/assets/too-dirty.png');
}
.tagline [href*='too-much'] {
  background-image: url('/assets/too-much.png');
}

.tagline [href*='too-little'] {
  background-image: url('/assets/too-little.png');
}

.globe-spacer {
  height: 85vh;
  width: 100vw;
  pointer-events: none;
}

.page-index__scroll-to-wrapper {
  width: calc(100vw - 40px);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 20px;
}

.page-index__scroll-to-button {
  color: var(--ui-invert);
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  cursor: pointer;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.23);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
}

.page-index__scroll-to-button:hover {
  background-color: var(--ui--blue);
  box-shadow: 0px 0px 50px 0px rgba(152, 171, 186, 0.75);
}

.page-index__button-icon {
  fill: var(--ui--white);
  display: block;
}

.page-index__book-list-wrapper {
  width: calc(100vw - 40px);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 20px;
}

.page-index__book-list-wrapper:before {
  content: '';
  display: block;
  width: 100%;
  height: calc(100% + 30vh);
  top: 0;
  transform: translateY(-30vh);
  position: absolute;
  background-image: linear-gradient(to bottom, rgba(0, 0, 42, 0) 0, rgba(0, 0, 42, 0.85) 30vh);
  pointer-events: none;
  z-index: -1;
}

.page-index__book-list {
  width: calc(100vw - 40px);
  max-width: 950px;
  z-index: 1;
}

@media (min-width: 600px) {
  .page-index__book-list-wrapper {
    width: calc(100vw - 80px);
    padding: 0 40px;
  }
}
</style>
