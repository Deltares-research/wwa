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
  asyncData (context) {
    return loadData(context, context.params)
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
