<template>
  <div>
    <theme-list v-bind:themes="themes" v-bind:active-slug="activeSlug" />
    <bottom-shelf>
      <card-list v-bind:cards="chapters" />
    </bottom-shelf>
  </div>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import events from '~/lib/events'
import loadData from '~/lib/load-data'
import ThemeList from '~/components/theme-list/ThemeList'

export default {
  async asyncData (context) {
    const chapters = loadData(context, context.params)
    const themes = loadData(context, { theme: 'index' })

    return {
      chapters: await chapters,
      themes: await themes
    }
  },
  data () {
    return { activeSlug: this.$route.params.theme }
  },
  components: {
    BottomShelf,
    CardList,
    ThemeList
  },
  mounted () {
    this.$events.$emit(events.activeThemeChanged, this.activeSlug)
  }
}
</script>
