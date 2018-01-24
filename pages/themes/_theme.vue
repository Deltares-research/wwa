<template>
  <section>
    <svg-icon v-if="theme" v-bind:icon="theme" />
    <card-list v-bind:cards="book.chapters" />
  </section>
</template>

<script>
import CardList from '~/components/card-list/CardList'
import SvgIcon from '~/components/svg-icon/SvgIcon'
import book from '~/static/data/books/coastal-safety/index.json'

export default {
  components: {
    CardList,
    SvgIcon
  },
  data () {
    return {
      book,
      theme: this.$route.params.theme
    }
  }
}
</script>
