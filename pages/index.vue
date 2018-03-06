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
  }
}
</script>

<style>
@import "../components/colors/colors.css";

.tagline {
  position: absolute;
  top: 5rem;
  margin-top: 5vw;
  width: 25vw;
  min-width: 10rem;
  max-width: 15rem;
  padding: 1rem;
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
  background-image: url('~/static/assets/too-dirty.png');
}
.tagline [href*='too-much'] {
  background-image: url('~/static/assets/too-much.png');
}

.tagline [href*='too-little'] {
  background-image: url('/static/assets/too-little.png');
}

</style>
