<template>
  <section>
    <ul class="inline-list">
      <li v-for="keyword in tags" v-bind:key="keyword.slug">
        <nuxt-link class="tag" v-bind:to="keyword.unsetLink">
          {{keyword.title }}
        </nuxt-link>
      </li>
    </ul>
    <card-list v-bind:cards="entries" />
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import '~/components/tag/tag.css'

export default {
  async asyncData (context) {
    const { params, route } = context
    const keywords = params.keywords.split('+')
    const data = await loadData(context, { keywords })
    const base = route.path.replace(/(\+?[^/])*(\/?)$/, '') // remove all tags
    const tags = data.tags.map(tag => {
      const excludingSelf = data.tags
        .filter(t => t.slug !== tag.slug)
        .map(t => t.slug)
        .join('+')
      tag.unsetLink = `${base}${excludingSelf}`
      return tag
    })
    return {
      tags,
      entries: data.entries || []
    }
  },
  components: {
    CardList
  },
  data () {
    return {
      theme: this.$route.params.theme
    }
  }
}
</script>
