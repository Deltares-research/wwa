<template>
  <div>
    <div class="list--scroll">
      <h1 class="book-title">{{title}}</h1>
      <title-list v-bind:titles="books" v-bind:active="[{ slug }]" v-bind:exclude="true" />
    </div>
    <card-list v-bind:cards="chapters" v-bind:currentBook="{ title, slug, path}"/>
  </div>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import TitleList from '~/components/title-list/TitleList'
import loadData from '~/lib/load-data'
import books from '~/static/data/books/index.json'

export default {
  async asyncData (context) {
    const { title, slug, path, chapters } = await loadData(context, context.params)
    return { title, slug, path, chapters }
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
  .book-title {
    color: white;
  }

  .book-title:before {
    content: 'Book:';
    display: inline-block;
    margin-right: 5px;
  }
</style>
