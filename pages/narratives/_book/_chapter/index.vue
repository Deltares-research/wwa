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
    this.$events.$emit(events.activeMarkerChanged, marker)
    this.$events.$emit(events.markersChanged, undefined)
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
