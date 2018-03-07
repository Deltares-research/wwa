<template>
  <div>
    <theme-list v-bind:themes="themes" v-bind:active-slug="(theme && theme.slug) ? theme.slug : null" />
    <bottom-shelf>
      <narrative-header v-bind:book="{ title, slug, path}" />
    <card-list v-bind:cards="chapters" />
    </bottom-shelf>
  </div>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import ThemeList from '~/components/theme-list/ThemeList'

export default {
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const { title, slug, path, chapters, theme } = await loadData(context, context.params)

    return { title, slug, path, chapters, themes: await themes, theme }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.chapters)
    this.$store.commit('replaceTheme', this.theme.slug)
    this.$store.commit('disableGlobeAutoRotation')
  },
  components: { BottomShelf, CardList, NarrativeHeader, ThemeList }
}
</script>

