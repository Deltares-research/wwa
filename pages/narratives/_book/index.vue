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
import books from '~/static/data/books/index.json'
import events from '~/components/events/events'
import loadData from '~/lib/load-data'

export default {
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
  },
  mounted () {
    const marker = {
      slug: this.slug,
      location: this.location,
      path: this.path
    }
    this.$events.$emit(events.enableGlobeNavigation)
    this.$events.$emit(events.activeFeatureChanged, marker)
    this.$events.$emit(events.featuresChanged, null)
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
