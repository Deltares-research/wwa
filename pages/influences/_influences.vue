<template>
  <section>
    <ul class="inline-list">
      <li v-for="influence in tags" v-bind:key="influence.slug">
        <nuxt-link v-bind:to="influence.path">
          {{ influence.title }}
        </nuxt-link>
      </li>
    </ul>
    <card-list v-bind:cards="entries" />
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'
import '~/components/list/list.css'

export default {
  async asyncData (context) {
    const { params } = context
    const influences = params.influences.split('+')
    const data = await loadData(context, { influences })
    const tags = data.tags
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
