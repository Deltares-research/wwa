<template>
  <div>
    <h1>{{title}}</h1>
    <card-list v-bind:cards="chapters" />
  </div>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'

export default {
  asyncData (context) {
    return loadData(context, context.params)
  },
  components: {
    CardList
  },
  data () {
    return {
      title: '',
      chapters: []
    }
  }
}
</script>
