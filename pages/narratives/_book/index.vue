<template>
  <card-list v-bind:cards="chapters" v-bind:book="{ title, slug, path}"/>
</template>

<script>
import books from '~/static/data/books/index.json'
import CardList from '~/components/card-list/CardList'
import events from '~/components/events/events'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const { title, slug, path, chapters } = await loadData(context, context.params)
    return { title, slug, path, chapters }
  },
  components: { CardList },
  data () {
    return {
      books,
      book: {}
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
