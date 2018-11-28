<template>
  <div>
    <bottom-shelf>
      <card-list v-bind:cards="chapters" bind:subtitle="title" />
    </bottom-shelf>
    <portal to="menu-center-content">
      <transition name="fade">
        <menu-dropdown v-bind:book="'title'" v-bind:booksList="booksList" />
      </transition>
    </portal>
  </div>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import MenuDropdown from '~/components/menu-dropdown/MenuDropdown'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const booksList = await loadData(context, { booksList: 'index' })
    const { book, chapters, theme } = await loadData(context, context.params)
    return { booksList, book, chapters, themes: await themes, theme }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.chapters)
    this.$store.commit('replaceTheme', this.theme.slug)
    this.$store.commit('disableGlobeAutoRotation')
  },
  components: { BottomShelf, CardList, MenuDropdown, NarrativeHeader }
}
</script>
