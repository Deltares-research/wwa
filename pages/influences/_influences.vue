<template>
  <section>
    <card-list v-bind:cards="entries" />
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const keywords = context.params.keywords.split('+')
    const data = await loadData(context, { keywords })
    return { entries: data.entries || [] }
  },
  components: {
    CardList
  },
  data () {
    return {
      theme: this.$route.params.theme
    }
  }
}
</script>
