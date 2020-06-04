<template>
  <div class="invert">
    <div class="globe-spacer-methodologies" />
    <div class="layout-section">
      <div class="layout-section__container">
        <h1>Methodologies</h1>
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
import allMethodologies from '~/static/data/methodologies/index.json'

export default {
  async asyncData (context) {
    const { params } = context
    const methodologiesFromUrl = (params.methodologies) ? [].concat(params.methodologies.split('+')) : []
    const { results = [] } = (methodologiesFromUrl) ? await loadData(context, { methodologies: methodologiesFromUrl }) : {}
    // Build active methodologies objects from url
    const activeMethodologies = allMethodologies
      .filter(tag => methodologiesFromUrl.some(active => active === tag.slug))

    return {
      methodologies: allMethodologies,
      activeMethodologies,
      results
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.results)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: {
    ChapterList
  }
}
</script>

<style>
@import "../../components/tag/tag.css";

.globe-spacer-methodologies {
  height: 60vh;
  width: 100vw;
  pointer-events: none;
}
</style>
