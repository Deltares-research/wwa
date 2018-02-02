<template>
  <section>
    <title-list v-bind:titles="influences" v-bind:active="{ slug: activeInfluences[0] }" />
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
  layout: 'list',
  async asyncData (context) {
    const { params } = context
    const activeInfluences = [ params.influences ]
    const { results = [] } = await loadData(context, { influences: activeInfluences })
    // Build active influences objects from url
    const activeInfluences = tags
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
