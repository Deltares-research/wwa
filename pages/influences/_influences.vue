<template>
  <section>
    <title-list v-bind:titles="influences" v-bind:active="activeInfluences" />
    <card-list v-bind:cards="results" />
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import TitleList from '~/components/title-list/TitleList'
import loadData from '~/lib/load-data'
import allInfluences from '~/static/data/influences/index.json'
import '~/components/list/list.css'

export default {
  async asyncData (context) {
    const { params } = context
    const influencesFromUrl = params.influences.split('+')
    const { results = [] } = await loadData(context, { influences: influencesFromUrl })
    // Build active influences objects from url
    const activeInfluences = allInfluences
      .filter(tag => influencesFromUrl.some(active => active === tag.slug))
    return {
      influences: allInfluences,
      activeInfluences,
      results
    }
  },
  components: {
    CardList,
    TitleList
  }
}
</script>
