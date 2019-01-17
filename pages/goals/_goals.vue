<template>
  <div class="invert">
    <div class="globe-spacer-goal" />
    <div class="layout-section">
      <div class="layout-section__container">
        <h1>Sustainable Development Goals</h1>
        <ul class="list--inline goal-filter">
          <li v-for="link in goals" :key="link.slug">
            <nuxt-link
              :class="`sdg-tag sdg-tag--filter sdg-tag--large sdg-tag--${link.slug.slice(0,2)}`"
              :to="link.path"
              :title="link.title"
              >
              <span class="sr-only">{{ link.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="layout-section layout-section--gradient">
      <div class="layout-section__container">
        <chapter-list :chapters="results" sorted="newest" :limit="32" />
      </div>
    </div>
  </div>
</template>

<script>
import ChapterList from '~/components/chapter-list/ChapterList'
import loadData from '~/lib/load-data'
import allGoals from '~/static/data/goals/index.json'

export default {
  async asyncData (context) {
    const { params } = context
    const goalsFromUrl = (params.goals) ? [].concat(params.goals.split('+')) : []
    const { results = [] } = (goalsFromUrl) ? await loadData(context, { goals: goalsFromUrl }) : {}
    // Build active goal objects from url
    const activeGoals = allGoals
      .filter(tag => goalsFromUrl.some(active => active === tag.slug))

    return {
      goals: allGoals,
      activeGoals,
      results
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.results)
    this.$store.commit('enableGlobeAutoRotation')
  },
  components: {
    ChapterList
  }
}
</script>

<style>
@import "../../components/tag/tag.css";

.globe-spacer-goal {
  height: 60vh;
  width: 100vw;
  pointer-events: none;
}

</style>

