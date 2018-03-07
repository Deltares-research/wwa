<template>
  <bottom-shelf>
    <title-list v-bind:titles="influences" v-bind:active="activeInfluences" />
    <card-list v-bind:cards="results" />
  </bottom-shelf>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import TitleList from '~/components/title-list/TitleList'
import loadData from '~/lib/load-data'
import allInfluences from '~/static/data/influences/index.json'

export default {
  async asyncData (context) {
    const { params } = context
    const influencesFromUrl = (params.influences) ? params.influences.split('+') : []
    const { results = [] } = (influencesFromUrl) ? await loadData(context, { influences: influencesFromUrl }) : {}
    // Build active influences objects from url
    const activeInfluences = allInfluences
      .filter(tag => influencesFromUrl.some(active => active === tag.slug))

    return {
      influences: allInfluences,
      activeInfluences,
      results
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.results)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: {
    BottomShelf,
    CardList,
    TitleList
  }
}
</script>
