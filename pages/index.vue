<template>
  <card-list v-bind:cards="cards" />
</template>

<script>
import CardList from '~/components/card-list/CardList'
import books from '~/static/data/books/index.json'

export default {
  components: {
    CardList
  },
  data () {
    return {
      cards: books
    }
  }
}
</script>

<style>
</style>
