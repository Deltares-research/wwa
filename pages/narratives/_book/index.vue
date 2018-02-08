<template>
  <card-list v-bind:cards="chapters" v-bind:book="{ title, slug, path}"/>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import books from '~/static/data/books/index.json'

export default {
  async asyncData (context) {
    const { title, slug, path, chapters } = await loadData(context, context.params)
    return { title, slug, path, chapters }
  },
  components: { CardList },
  data () {
    return {
      books,
      book: {}
    }
  }
}
</script>
