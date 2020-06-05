<template>
  <div class="invert">
    <div class="globe-spacer-theme"></div>
    <div class="layout-section">
      <div class="layout-section__container">
        <h1>{{ title }}</h1>
        <div v-html="htmlBody"></div>
      </div>
    </div>
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
import marked from '~/lib/marked'

export default {
  layout: 'globe',
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const { slug, entries, title, body } = await loadData(context, context.params)
    return {
      slug,
      entries,
      title,
      body,
      themes: await themes
    }
  },
  computed: {
    htmlBody () {
      return marked(this.body)
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.entries)
    this.$store.commit('replaceTheme', this.$route.params.themes)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: { ChapterList }
}
</script>

<style>
.globe-spacer-theme {
  height: 65vh;
  width: 100vw;
  pointer-events: none;
}
.layout-section--themes {
  padding-top: 1rem;
}
.layout-section--theme-too-much-active {
  background-color: var(--ui--bg--theme-too-much-dark-trans);
}
.layout-section--theme-too-little-active {
  background-color: var(--ui--bg--theme-too-little-dark-trans);
}
.layout-section--theme-too-dirty-active {
  background-color: var(--ui--bg--theme-too-dirty-dark-trans);
}
</style>
