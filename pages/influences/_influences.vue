<template>
  <bottom-shelf>
    <card-list :cards="results">
      <template slot="header">
        <h1><span class="sr-only">Influences</span></h1>
        <ul class="list--inline influences-filter">
          <li v-for="link in influences" :key="link.slug">
            <nuxt-link
              :class="`tag tag--influence tag--${link.slug} ${(activeInfluences.some(a => a.slug === link.slug)) ? 'active' : ''}`"
              :to="link.path">
              {{ link.title }}
            </nuxt-link>
          </li>
        </ul>
      </template>
    </card-list>
  </bottom-shelf>
</template>

<script>
import BottomShelf from '~/components/bottom-shelf/BottomShelf'
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import allInfluences from '~/static/data/influences/index.json'

export default {
  async asyncData (context) {
    const { params } = context
    const influencesFromUrl = (params.influences) ? [].concat(params.influences.split('+')) : []
    const { results = [] } = (influencesFromUrl) ? await loadData(context, { influences: influencesFromUrl }) : {}
    // Build active influences objects from url
    const activeInfluences = allInfluences
      .filter(tag => influencesFromUrl.some(active => active === tag.slug))

    return {
      influences: allInfluences,
      activeInfluences,
      results
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.results)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: {
    BottomShelf,
    CardList
  }
}
</script>

<style>
@import "../../components/tag/tag.css";

.influences-filter .tag {
  transition: opacity .25s;
}
.influences-filter .tag:not(.active) {
  opacity: .5;
}
.influences-filter .tag:hover {
  opacity: 1;
}


</style>

