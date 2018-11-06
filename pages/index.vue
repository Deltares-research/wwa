<template>
  <div class="tagline invert" v-html="body"></div>
</template>

<script>
import loadData from '~/lib/load-data'
import marked from '~/lib/custom-marked'
import home from '~/static/data/home.json'

export default {
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

</style>
