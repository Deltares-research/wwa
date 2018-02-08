<template>
  <card-list
    v-bind:cards="pages"
    v-bind:book="{ title: book.title, path: book.path}"
    v-bind:chapter="{title, path }"/>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import events from '~/components/events/events'

export default {
  async asyncData (context) {
    const { location, pages, path, slug, title, book } = await loadData(context, context.params)
    return { location, pages, path, slug, title, book }
  },
  mounted () {
    const marker = {
      slug: this.slug,
      location: this.location,
      path: this.path
    }
    this.$events.$emit(events.activeFeatureChanged, marker)
    this.$events.$emit(events.featuresChanged, null)
  },
  components: { CardList },
  data () {
    return {
      title: '',
      pages: [],
      book: {},
      chapter: {}
    }
  }
}
</script>
