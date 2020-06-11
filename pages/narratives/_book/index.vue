<template>
  <div class="invert">
    <div class="layout-section">
      <div class="layout-section__container">
        <book-header :title="title" :body="body" />
      </div>
    </div>
    <div class="layout-section layout-section--gradient">
      <div class="layout-section__container">
        <chapter-list :chapters="chapters" sorted="newest" :limit="9" />
      </div>
    </div>
  </div>
</template>

<script>
import BookHeader from '~/components/book-header/BookHeader'
import ChapterList from '~/components/chapter-list/ChapterList'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import loadData from '~/lib/load-data'
import marked from '~/lib/marked'

export default {
  layout: 'globe',
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const { title, body, chapters, theme } = await loadData(context, context.params)
    return { title, body, chapters, themes: await themes, theme }
  },
  computed: {
    htmlBody () {
      return marked(this.body)
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.chapters)
    this.$store.commit('replaceTheme', this.theme.slug)
    this.$store.commit('disableGlobeAutoRotation')
  },
  components: { BookHeader, ChapterList, NarrativeHeader }
}
</script>
