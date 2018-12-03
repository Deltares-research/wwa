<template>
  <bottom-shelf>
    <card-list :cards="results" >
      <template slot="header">
        <h1><span class="sr-only">Keywords</span></h1>
        <ul class="list--inline">
          <li v-for="keyword in activeKeywords" :key="keyword.slug">
            <nuxt-link class="tag tag--removable" :to="keyword.unsetLink">
              <span class="sr-only">remove </span>{{keyword.title }}
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
      </template>
    </card-list>
  </bottom-shelf>
</template>

<script>
import allKeywords from '~/static/data/keywords/index.json'
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
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
    BottomShelf,
    CardList
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

