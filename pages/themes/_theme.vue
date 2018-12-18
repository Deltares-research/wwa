<template>
  <div class="invert">
    <div class="globe-spacer-theme"></div>
    <theme-switch :themes="themes" :active-slug="slug" />
    <div
      class="layout-section layout-section--themes"
      :class="`layout-section--theme-${slug}-active`"
    >
      <div class="layout-section__container">
        <chapter-list :chapters="entries" sorted="newest" :limit="32" />
      </div>
    </div>
  </div>
</template>

<script>
import ChapterList from '~/components/chapter-list/ChapterList'
import loadData from '~/lib/load-data'
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
  components: { ChapterList, ThemeSwitch }
}
</script>

<style>
.globe-spacer-theme {
  height: 82vh;
  width: 100vw;
  pointer-events: none;
}
.layout-section--themes {
  padding-top: 1rem;
}
.layout-section--theme-too-much-active {
  background-color: var(--ui--bg--theme-too-much-trans);
}
.layout-section--theme-too-little-active {
  background-color: var(--ui--bg--theme-too-little-trans);
}
.layout-section--theme-too-dirty-active {
  background-color: var(--ui--bg--theme-too-dirty-trans);
}
</style>
