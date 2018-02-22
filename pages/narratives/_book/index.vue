<template>
  <div>
    <theme-list v-bind:themes="themes" v-bind:active-slug="theme.slug" />
    <bottom-shelf>
      <narrative-header v-bind:book="{ title, slug, path}" />
    <card-list v-bind:cards="chapters" />
    </bottom-shelf>
  </div>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import events from '~/lib/events'
import loadData from '~/lib/load-data'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import ThemeList from '~/components/theme-list/ThemeList'

export default {
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const { title, slug, path, chapters, theme } = await loadData(context, context.params)
    console.log(theme)
    return { title, slug, path, chapters, themes: await themes, theme }
  },
  components: { BottomShelf, CardList, NarrativeHeader, ThemeList },
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

