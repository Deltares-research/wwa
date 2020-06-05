<template>
  <div class="invert">
    <div class="globe-spacer-methodologies" />
    <div class="layout-section">
      <div class="layout-section__container">
        <h1>{{ title }}</h1>
        <div v-html="htmlBody"></div>
      </div>
    </div>
    <div class="layout-section layout-section--gradient">
      <div class="layout-section__container">
        <chapter-list :chapters="results" sorted="newest" :limit="20" />
      </div>
    </div>
  </div>
</template>

<script>
import ChapterList from '~/components/chapter-list/ChapterList'
import loadData from '~/lib/load-data'
import marked from '~/lib/marked'
import allMethodologies from '~/static/data/methodologies/index.json'

export default {
  layout: 'globe',
  async asyncData (context) {
    const { params } = context
    const methodologiesFromUrl = (params.slug) ? [].concat(params.slug.split('+')) : []
    const { results = [], title, body } = (methodologiesFromUrl) ? await loadData(context, { methodologies: methodologiesFromUrl }) : {}
    // Build active methodologies objects from url
    const activeMethodologies = allMethodologies
      .filter(tag => methodologiesFromUrl.some(active => active === tag.slug))

    return {
      methodologies: allMethodologies,
      activeMethodologies,
      title,
      body,
      results
    }
  },
  computed: {
    htmlBody () {
      return marked(this.body)
    }
  },
  mounted () {
    this.$store.commit('replaceTheme', 'too-much')
    this.$store.commit('replaceFeatures', this.results)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: { ChapterList }
}
</script>
