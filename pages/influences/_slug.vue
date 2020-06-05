<template>
  <div class="invert">
    <div class="globe-spacer-influences" />
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
import allInfluences from '~/static/data/influences/index.json'

export default {
  async asyncData (context) {
    const { params } = context
    const influencesFromUrl = (params.slug) ? [].concat(params.slug.split('+')) : []
    const { results = [], title, body } = (influencesFromUrl) ? await loadData(context, { influences: influencesFromUrl }) : {}
    // Build active influences objects from url
    const activeInfluences = allInfluences
      .filter(tag => influencesFromUrl.some(active => active === tag.slug))

    return {
      influences: allInfluences,
      activeInfluences,
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

<style>
@import "../../components/tag/tag.css";

.globe-spacer-influences {
  height: 65vh;
  width: 100vw;
  pointer-events: none;
}
</style>
