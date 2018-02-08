<template>
  <div>
    <h1>{{title}}</h1>
    <card-list v-bind:cards="pages" />
  </div>
</template>
<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import events from '~/components/events/events'

export default {
  async asyncData (context) {
    const { location, pages, path, slug, title } = await loadData(context, context.params)
    return { location, pages, path, slug, title }
  },
  mounted () {
    const marker = {
      slug: this.slug,
      location: this.location,
      path: this.path
    }
    this.$events.$emit(enableGlobeNavigation)
    this.$events.$emit(events.activeFeatureChanged, marker)
    this.$events.$emit(events.featuresChanged, null)
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
