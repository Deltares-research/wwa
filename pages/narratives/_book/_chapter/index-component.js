import Vue from 'vue'
import VueEvents from 'vue-events'

import CardList from '~/components/card-list/CardList'
import loadData from '~/lib/load-data'

Vue.use(VueEvents)

export default {
  layout: 'list',
  asyncData (context) {
    return loadData(context, context.params)
  },
  created () {
    console.log('chapter index created')
  },
  mounted () {
    console.log('chapter index mounted')
    const marker = {
      slug: this.slug,
      location: this.location,
      path: this.path
    }
    this.$events.$emit('marker-selected', marker)
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
