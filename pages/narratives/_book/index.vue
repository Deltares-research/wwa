<template>
  <div>
    <bottom-shelf>
      <card-list v-bind:cards="chapters" bind:subtitle="title" />
    </bottom-shelf>
  </div>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const { chapters, theme } = await loadData(context, context.params)
    return { chapters, themes: await themes, theme }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.chapters)
    this.$store.commit('replaceTheme', this.theme.slug)
    this.$store.commit('disableGlobeAutoRotation')
  },
  components: { BottomShelf, CardList }
}
</script>

