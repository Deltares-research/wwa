<template>
  <div>
    <h1 class="title">World Water Atlas</h1>
    <card-list v-bind:cards="books" />
  </div>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import books from '~/static/data/books/index.json'
import events from '~/components/events/events'

export default {
  components: { CardList },
  mounted () {
    this.$events.$emit(events.enableGlobeNavigation)
  },
  data () {
    return { books }
  }
}
</script>
