<template>
  <section>
    <ul class="list--inline">
      <li v-for="influence in influences" v-bind:key="influence.slug">
        <span v-if="activeInfluences.some(active => active.slug === influence.slug)">
          {{ influence.title }}
        </span>
        <nuxt-link v-bind:to="influence.path" v-else>
          {{ influence.title }}
        </nuxt-link>
      </li>
    </ul>
    <card-list v-bind:cards="results" />
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import allInfluences from '~/static/data/influences/index.json'
import '~/components/list/list.css'

export default {
  async asyncData (context) {
    const { params } = context
    const influencesFromUrl = params.influences.split('+')
    const { tags, results = [] } = await loadData(context, { influences: influencesFromUrl })
    // Build active influences objects from url
    const activeInfluences = tags
      .filter(tag => influencesFromUrl.some(active => active === tag.slug))
    return {
      influences: allInfluences,
      activeInfluences,
      results
    }
  },
  components: {
    CardList
  }
}
</script>
