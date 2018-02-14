<template>
  <theme-list v-bind:themes="themes" />
</template>

<script>
import events from '~/components/events/events'
import loadData from '~/lib/load-data'
import ThemeList from '~/components/theme-list/ThemeList'

export default {
  async asyncData (context) {
    const themes = await loadData(context, { theme: 'index' })
    return { themes }
  },
  components: { ThemeList },
  mounted () {
    this.$events.$emit(events.enableGlobeNavigation)
  }
}
</script>
