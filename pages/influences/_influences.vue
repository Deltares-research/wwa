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
import influences from '~/static/data/influences/index.json'
import '~/components/list/list.css'

export default {
  layout: 'list',
  async asyncData (context) {
    const { params } = context
    const activeInfluences = params.influences
    const { results = [] } = await loadData(context, { influences: activeInfluences })
    return {
      influences,
      activeInfluences,
      results
    }
  },
  components: {
    CardList,
    TitleList
  },
  data () {
    return {
      theme: this.$route.params.theme
    }
  }
}
</script>
