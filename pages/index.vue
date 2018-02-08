<template>
  <div>
    <h1 class="title">World Water Atlas</h1>
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
  mounted () {
    this.$events.$emit('enable-globe')
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
