<template>
  <div class="invert">
    <div class="tagline" v-html="body"></div>
    <div class="globe-spacer"/>

    <div class="page-index__book-list-wrapper">
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

export default {
  components: { BookList, ChapterList },
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
  height: 100vh;
  width: 100vw;
  pointer-events: none;
}

.page-index__book-list-wrapper {
  width: 100vw;
  display: flex;
  justify-content: center;
  position: relative;
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
</style>
