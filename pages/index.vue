<template>
  <div class="invert">
    <div class="tagline" v-html="body"></div>
    <div class="globe-spacer" />

    <video-highlights
      id="scrollToBooksList"
      :videoHighlights="videoHighlights"
    />
    <div class="layout-section">
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
    const videoHighlights = home.videoHighlights
    return { body, videoHighlights }
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
      window.scrollBy({ top: domRect.y - 128, behavior: 'smooth' })
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
  height: 80vh;
  width: 100vw;
  pointer-events: none;
}
</style>
