<template>
  <section>
    <card-list v-bind:cards="pages" />
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'

export default {
  asyncData (context) {
    const keywords = context.params.keywords.split('+')
    return { pages: loadData(context, { keywords }) || [] }
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
