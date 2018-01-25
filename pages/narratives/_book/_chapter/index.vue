<template>
  <div>
    <h1>{{title}}</h1>
    <card-list v-bind:cards="pages" />
  </div>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import chapter from '~/static/data/books/coastal-safety/chapters/impacts-on-coastal-safety/index.json'

const title = chapter.title
const pages = chapter.pages

export default {
  components: {
    CardList
  },
  data () {
    return {
      title,
      pages
    }
  }
}
</script>
