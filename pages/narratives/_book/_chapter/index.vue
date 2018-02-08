<template>
  <div>
    <h1 class="chapter-title">{{title}}</h1>
    <card-list v-bind:cards="pages" v-bind:book="[{ 'foo': 'bar'}]" v-bind:title="[ bookTitle, title ]"/>
  </div>
</template>
<script>
import Vue from 'vue'
import VueEvents from 'vue-events'

import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'

Vue.use(VueEvents)
export default {
  async asyncData (context) {
    const { title, slug, chapters, book } = await loadData(context, context.params)
    return { title, slug, chapters, bookTitle: book.title }
  },
  mounted () {
    const marker = {
      slug: this.slug,
      location: this.location,
      path: this.path
    }
    this.$events.$emit('marker-selected', marker)
  },
  components: {
    CardList
  },
  data () {
    return {
      title: '',
      pages: []
    }
  }
}
</script>

<style>
.chapter-title {
  color: white;
}

.chapter-title:before {
  content: 'Chapter:';
  display: inline-block;
  margin-right: 5px;
}
</style>
