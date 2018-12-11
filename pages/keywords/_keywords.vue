<template>
  <div class="invert">
    <div class="globe-spacer-keywords" />
    <div class="layout-section">
      <div class="layout-section__container">
        <h1>Keywords</h1>
        <ul class="list--inline">
          <li v-for="keyword in activeKeywords" :key="keyword.slug">
            <nuxt-link class="tag tag--removable" :to="keyword.unsetLink">
              <span class="sr-only">remove </span>{{ keyword.title }}
            </nuxt-link>
          </li>
          <li>
            <select class="tag tag--control" @change="updatePath">
              <option disabled selected>Select new keyword to add</option>
              <option v-for="keyword in availableKeywords" :key="keyword.slug"
                :value="keyword.slug">
                {{ keyword.title }}
              </option>
            </select>
          </li>
        </ul>
      </div>
    </div>
    <div class="layout-section layout-section--gradient">
      <div class="layout-section__container">
        <chapter-list :chapters="results" sorted="newest" :limit="20" />
      </div>
    </div>
  </div>
</template>

<script>
import allKeywords from '~/static/data/keywords/index.json'
import ChapterList from '~/components/chapter-list/ChapterList'
import loadData from '~/lib/load-data'
import { unionByProp } from '~/lib/set-operations'

export default {
  async asyncData (context) {
    const { params } = context
    const keywordsFromUrl = (params.keywords) ? [].concat(params.keywords.split('+')) : []
    const { results = [], tags: keywords = [] } = await loadData(context, { keywords: keywordsFromUrl })

    return {
      keywords,
      results
    }
  },
  data () {
    return { allKeywords }
  },
  components: {
    ChapterList
  },
  computed: {
    activeKeywords () {
      const base = this.$route.path.replace(/(\+?[^/])*(\/?)$/, '') // remove all tags
      return this.keywords.map(tag => {
        const excludingSelf = this.keywords
          .filter(t => t.slug !== tag.slug)
          .map(t => t.slug)
          .join('+')
        tag.unsetLink = `${base}${excludingSelf}`
        return tag
      })
    },
    availableKeywords () {
      // Build available keywords objects from results
      const availableKeywords = this.results
        .reduce((acc, result) => unionByProp(acc, result.keywords, 'slug'), [])
        .filter(keyword => this.activeKeywords.every(active => active.slug !== keyword.slug))

      return (availableKeywords.length) ? availableKeywords : this.allKeywords
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.results)
  },
  methods: {
    updatePath (event) {
      const keywordSlug = event.target.value
      const currentSlug = this.keywords.map(kewyord => kewyord.slug).join('+')
      this.$router.push(`/keywords/${(currentSlug) ? currentSlug + '+' : ''}${keywordSlug}`)
    }
  }
}
</script>

<style>
  .globe-spacer-keywords {
    height: 50vh;
    width: 100vw;
    pointer-events: none;
  }
</style>
