<template>
  <div class="invert">
    <div class="globe-spacer-narrative"/>
    <div class="layout-section">
      <div class="layout-section__container">
        <div class="book-header">
          <h1 class="book-title">{{ title }}</h1>
          <p
            v-if="body.length"
            class="book-description"
            v-html="htmlBody"
          >
          </p>
        </div>
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
  components: { ChapterList, NarrativeHeader }
}
</script>

<style>
.book-title {
  margin-bottom: 0.5rem;
}
.book-description {
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .book-header {
    max-width: 66%;
  }
  .book-title {
    font-size: 3rem;
  }
  .book-description {
    margin-bottom: 4rem;
  }
}
</style>
