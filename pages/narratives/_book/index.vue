<template>
  <div>
    <div class="list--scroll">
      <h1>{{title}}</h1>
      <ul class="books list--inline">
        <li v-for="book in books" v-bind:key="book.slug" class="h1">
          <nuxt-link v-if="book.slug !== slug" v-bind:to="book.path">
            <span class="sr-only">Go to book</span> {{book.title}}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <card-list v-bind:cards="chapters" />
  </div>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import books from '~/static/data/books/index.json'

export default {
  layout: 'list',
  asyncData (context) {
    return loadData(context, context.params)
  },
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
<style scoped>
  h1,
  .books {
    display: inline-block;
    vertical-align: baseline;
  }
</style>

