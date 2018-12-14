<template>
  <div class="invert">
    <div class="globe-spacer-theme"></div>
    <!-- <theme-list :themes="themes" :active-slug="slug" /> -->
    <theme-switch :themes="themes" :active-slug="slug" />
    <div class="layout-section layout-section--gradient">
      <div class="layout-section__container">
        <chapter-list :chapters="entries" sorted="newest" :limit="24" />
      </div>
    </div>
  </div>
</template>

<script>
import ChapterList from '~/components/chapter-list/ChapterList'
import loadData from '~/lib/load-data'
import ThemeList from '~/components/theme-list/ThemeList'
import ThemeSwitch from '~/components/theme-switch/ThemeSwitch'

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
  components: { ChapterList, ThemeList, ThemeSwitch }
}
</script>

<style>
.globe-spacer-theme {
  height: 85vh;
  width: 100vw;
  pointer-events: none;
}
</style>
