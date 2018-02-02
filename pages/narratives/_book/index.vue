<template>
  <div>
    <div class="list--scroll">
      <h1>{{title}}</h1>
      <title-list v-bind:titles="books" v-bind:active="[{ slug }]" v-bind:exclude="true" />
    </div>
    <card-list v-bind:cards="chapters" />
  </div>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import TitleList from '~/components/title-list/TitleList'
import loadData from '~/lib/load-data'
import books from '~/static/data/books/index.json'

export default {
  layout: 'list',
  asyncData (context) {
    return loadData(context, context.params)
  },
  components: {
    CardList,
    TitleList
  },
  data () {
    return {
      books
    }
  }
}
</script>
<style scoped>
  h1,
  .title-list {
    display: inline-block;
    vertical-align: baseline;
  }
</style>
