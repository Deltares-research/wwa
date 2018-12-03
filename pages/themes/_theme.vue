<template>
  <div>
    <theme-list :themes="themes" :active-slug="slug" />
    <bottom-shelf>
      <card-list :cards="entries" />
    </bottom-shelf>
  </div>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import ThemeList from '~/components/theme-list/ThemeList'

export default {
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const { slug, entries } = await loadData(context, context.params)
    return {
      slug,
      entries,
      themes: await themes
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.entries)
    this.$store.commit('replaceTheme', this.$route.params.theme)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: {
    BottomShelf,
    CardList,
    ThemeList
  }
}
</script>
