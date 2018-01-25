<template>
  <div>
    <h1>{{title}}</h1>
    <card-list v-bind:cards="chapters" />
  </div>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import book from '~/static/data/books/coastal-safety/index.json'

const title = book.title
const chapters = book.chapters

export default {
  components: {
    CardList
  },
  data () {
    return {
      title,
      chapters
    }
  }
}
</script>
