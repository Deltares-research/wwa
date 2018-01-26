<template>
  <div>
    <page-component v-for="page in pages" v-bind:key="page.slug"
      v-bind:page="page"
      v-bind:id="page.slug"
      class="page-component" />
  </div>
</template>

<script>
import loadData from '~/lib/load-data'
import PageComponent from '~/components/page-component/PageComponent'

export default {
  asyncData (context) {
    return loadData(context)
  },
  mounted () {
    // Jump to page based on slug
    const slug = this.$route.params.page
    const activePage = document.getElementById(slug)
    const top = activePage.getBoundingClientRect().top || 0
    const y = Math.round(top - ((window.innerHeight || document.clientHeight) / 2)) // match with margin between PageComponents
    window.scroll(0, y)
  },
  components: {
    PageComponent
  }
}
</script>

<style>
.page-component:first-child {
  margin-top: 62.5vh;
}
.page-component {
  margin: 50vh auto;
}
</style>
