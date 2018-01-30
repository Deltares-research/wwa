<template>
  <section>
    <ul class="inline-list">
      <li v-for="influence in influences" v-bind:key="influence.slug">
        <span v-if="activeInfluences.some(active => active === influence.slug)">
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
import influences from '~/static/data/influences/index.json'
import '~/components/list/list.css'

export default {
  async asyncData (context) {
    const { params } = context
    const activeInfluences = params.influences.split('+')
    const { results = [] } = await loadData(context, { influences: activeInfluences })
    return {
      influences,
      activeInfluences,
      results
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
