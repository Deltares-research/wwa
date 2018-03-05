<template>
  <div class="main-page">
    <theme-list v-bind:themes="themes" />
    <main>
      <video src="https://s3-eu-west-1.amazonaws.com/deltares-opendata/wwa/movies/waterpromise.mp4" controls autoplay draggable @dragend="hide"></video>
    </main>
  </div>
</template>
<script>
import loadData from '~/lib/load-data'
import ThemeList from '~/components/theme-list/ThemeList'

export default {
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const books = await loadData(context, { book: 'index' })

    const markers = books
      .reduce((a, b) => a.concat(b.chapters), []) // flatten array
      .filter(marker => marker.location)

    return { books, markers, themes: await themes }
  },
  components: { ThemeList },
  mounted () {
    this.$store.commit('replaceFeatures', this.markers)
    this.$store.commit('enableInteraction')
  },
  methods: {
    hide (evt) {
      evt.srcElement.classList.add('hidden')
      // slowly lower the volume
      let timer = 0
      let volume = 1
      // from 1 to 0
      for (var i = 0; i < 10; i++) {
        // every so often
        setTimeout(
          () => {
            evt.srcElement.volume = volume
          },
          timer
        )
        timer += 200
        volume -= 0.1
      }
      // from here the globe should render the video
    }
  }
}
</script>
<style>
  .main-page main {
    pointer-events: none;
    touch-action: none;
    top: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .main-page video {
    pointer-events: initial;
    touch-action: initial;
    max-height: 30vh;
    margin: 2rem;
  }
  .main-page video.hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 2s, opacity 0.5s linear;
  }
</style>
