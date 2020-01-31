<template>
  <div class="invert">
    <div class="globe-spacer-influences" />
    <div class="layout-section">
      <div class="layout-section__container">
        <h1>Influences</h1>
        <ul class="list--inline influences-filter">
          <li v-for="link in influences" :key="link.slug">
            <nuxt-link
              :class="`tag tag--influence tag--${link.slug} ${(activeInfluences.some(a => a.slug === link.slug)) ? 'active' : ''}`"
              :to="link.path">
              {{ link.title }}
            </nuxt-link>
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
import ChapterList from '~/components/chapter-list/ChapterList'
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
    this.$store.commit('setBackButtonToHome')
  },
  components: {
    ChapterList
  }
}
</script>

<style>
@import "../../components/tag/tag.css";

.globe-spacer-influences {
  height: 60vh;
  width: 100vw;
  pointer-events: none;
}

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

