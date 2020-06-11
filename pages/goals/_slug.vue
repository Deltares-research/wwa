<template>
  <div class="invert">
    <div class="layout-section">
      <div class="layout-section__container">
        <book-header :title="title" :body="htmlBody" />
      </div>
    </div>
    <div class="layout-section">
      <div class="layout-section__container">
        <chapter-list :chapters="results" sorted="newest" :limit="32" />
      </div>
    </div>
  </div>
</template>

<script>
import BookHeader from '~/components/book-header/BookHeader'
import ChapterList from '~/components/chapter-list/ChapterList'
import loadData from '~/lib/load-data'
import marked from '~/lib/marked'
import allGoals from '~/static/data/goals/index.json'

export default {
  layout: 'globe',
  async asyncData (context) {
    const { params } = context
    const goalsFromUrl = (params.slug) ? [].concat(params.slug.split('+')) : []
    const { results = [], title, body } = (goalsFromUrl) ? await loadData(context, { goals: goalsFromUrl }) : {}
    // Build active goal objects from url
    const activeGoals = allGoals
      .filter(tag => goalsFromUrl.some(active => active === tag.slug))

    return {
      goals: allGoals,
      activeGoals,
      title,
      body,
      results
    }
  },
  computed: {
    htmlBody () {
      return marked(this.body)
    }
  },
  mounted () {
    this.$store.commit('replaceTheme', 'too-much')
    this.$store.commit('replaceFeatures', this.results)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: { BookHeader, ChapterList }
}
</script>
