<template>
  <div>
    <h1>{{title}}</h1>
    <card-list v-bind:cards="pages" />
  </div>
</template>
<script>
import Vue from 'vue'
import VueEvents from 'vue-events'

import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'

Vue.use(VueEvents)

export default {
  asyncData (context) {
    return loadData(context, context.params)
  },
  mounted () {
    const marker = {
      slug: this.slug,
      location: this.location,
      path: this.path
    }
    this.$events.$emit('marker-selected', marker)
    // TODO: check if this is the best location to emit this event.
    this.$events.$emit('enable-globe')
  },
  components: {
    CardList
  },
  data () {
    return {
      title: '',
      pages: []
    }
  }
}
</script>
