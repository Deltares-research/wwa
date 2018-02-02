<template>
  <section>
    <ul class="list--inline">
      <li v-for="keyword in tags" v-bind:key="keyword.slug">
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
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'

export default {
  layout: 'list',
  async asyncData (context) {
    const { params, route } = context
    const keywords = params.keywords.split('+')
    const data = await loadData(context, { keywords })
    const results = (data) ? data.results : []
    const keywords = data.tags

    return {
      keywords,
      results
    }
  },
  components: {
    CardList
  },
  computed: {
    activeKeywords () {
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
    availableKeywords () {
      // Build available keywords objects from results
      return this.results
        .reduce((acc, result) => unionByProp(acc, result.keywords, 'slug'), [])
        .filter(keyword => this.activeKeywords.every(active => active.slug !== keyword.slug))
    }
  },
  components: {
    CardList
  }  }
/script>
