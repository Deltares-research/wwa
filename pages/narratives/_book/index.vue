<template>
  <bottom-shelf>
    <narrative-header v-bind:book="{ title, slug, path}" />
    <card-list v-bind:cards="chapters" />
  </bottom-shelf>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import events from '~/components/events/events'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const { title, slug, path, chapters } = await loadData(context, context.params)
    return { title, slug, path, chapters }
  },
  components: { BottomShelf, CardList, NarrativeHeader },
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

