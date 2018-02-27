<template>
  <theme-list v-bind:themes="themes" />
</template>

<script>
import loadData from '~/lib/load-data'
import ThemeList from '~/components/theme-list/ThemeList'

export default {
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const books = await loadData(context, { book: 'index' })

    const markers = books
      .reduce((a, b) => a.concat(b.chapters), []) // flatten array
      .filter(marker => marker.location)

    context.store.commit('globe/enableInteraction')
    context.store.commit('globe/replaceFeatures', markers)

    return { themes: await themes, books }
  },
  components: { ThemeList }
}
</script>
