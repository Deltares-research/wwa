<template>
  <section>
    <svg-icon v-if="theme" v-bind:icon="theme" />
    <card-list v-bind:cards="books" />
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import SvgIcon from '~/components/svg-icon/SvgIcon'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const books = await loadData(context, context.params)
    return { books }
  },
  components: {
    CardList,
    SvgIcon
  },
  data () {
    return {
      theme: this.$route.params.theme
    }
  }
}
</script>
