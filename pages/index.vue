<template>
  <div>
    <h1>World Water Atlas</h1>
    <card-list v-bind:cards="books" />
  </div>
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
      books
    }
  }
}
</script>

<style>
</style>
