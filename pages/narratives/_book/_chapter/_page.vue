<template>
  <div>
    <page-component v-for="page in pages" v-bind:key="page.slug" v-bind:page="page" class="page-component"/>
  </div>
</template>

<script>
import PageComponent from '~/components/page-component/PageComponent'
import chapter from '~/static/data/books/coastal-safety/chapters/impacts-on-coastal-safety/index.json'

const pages = chapter.pages

export default {
  components: {
    PageComponent
  },
  data () {
    return { pages }
  }
}
</script>

<style>
.page-component:first-child {
  margin-top: 62.5vh;
}
</style>
