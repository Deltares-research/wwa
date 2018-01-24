<template>
  <card-list v-bind:cards="chapter" />
</template>

<script>
import CardList from '~/components/card-list/CardList'
import chapter from '~/static/data/books/coastal-safety/chapters/impacts-on-coastal-safety/index.json'

export default {
  components: {
    CardList
  },
  data () {
    return {
      chapter
    }
  }
}
</script>
