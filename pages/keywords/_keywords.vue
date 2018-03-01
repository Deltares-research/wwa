<template>
  <bottom-shelf>
    <ul class="list--inline">
      <li v-for="keyword in activeKeywords" v-bind:key="keyword.slug">
        <nuxt-link class="tag tag--removable" v-bind:to="keyword.unsetLink">
          <span class="sr-only">remove </span>{{keyword.title }}
        </nuxt-link>
      </li>
      <li>
        <select class="tag tag--control" v-on:change="updatePath">
          <option disabled selected>Select new keyword to add</option>
          <option v-for="keyword in availableKeywords" v-bind:key="keyword.slug"
            v-bind:value="keyword.slug">
            {{ keyword.title }}
          </option>
        </select>
      </li>
    </ul>
    <card-list v-bind:cards="results" />
  </bottom-shelf>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import { unionByProp } from '~/lib/set-operations'

export default {
  async asyncData (context) {
    const { params } = context
    const keywordsFromUrl = (params.keywords) ? params.keywords.split('+') : []
    const { results = [], tags: keywords = [] } = await loadData(context, { keywords: keywordsFromUrl })

    return {
      keywords,
      results
    }
  },
  created () {
    this.$store.commit('replaceFeatures', this.results)
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
      return this.results
        .reduce((acc, result) => unionByProp(acc, result.keywords, 'slug'), [])
        .filter(keyword => this.activeKeywords.every(active => active.slug !== keyword.slug))
    }
  },
  methods: {
    updatePath (event) {
      const keywordSlug = event.target.value
      const path = this.$route.path.replace(/\/$/, '') // remove trailing slash
      this.$router.push(`${path}+${keywordSlug}`)
    }
  }
}
</script>
