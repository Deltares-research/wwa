<template>
  <card-list v-bind:cards="book.chapters" />
</template>

<script>
import CardList from '~/components/card-list/CardList'
import book from '~/static/data/books/coastal-safety/index.json'

export default {
  components: {
    CardList
  },
  data () {
    return {
      book
    }
  }
}
</script>
