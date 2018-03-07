<template>
  <article class="page-component">
    <page-body
      v-bind:body="page.body"
      v-bind:images="page.images"
      v-bind:graphs="page.graphs"
      v-bind:title="page.title"
      v-bind:video="page.video"
      v-bind:mapboxStyle="page.mapboxStyle"
      v-bind:links="page.links"
      v-bind:partner="page.partner" />
    <page-aside
      v-bind:influences="page.influences"
      v-bind:keywords="page.keywords"
      v-bind:storyteller="page.storyteller"
      v-bind:theme="page.theme" />
  </article>
</template>

<script>
import PageAside from '~/components/page-aside/PageAside'
import PageBody from '~/components/page-body/PageBody'

export default {
  props: {
    page: { type: Object }
  },
  components: {
    PageAside,
    PageBody
  }
}
</script>

<style>
@import '../colors/colors.css';

.page-component {
  display: flex;
  position: relative;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  min-height: 25vh;
  max-width: 60rem;
}

@media screen and (min-width: 720px) {
  .page-component {
    flex-direction: row;
      padding-left: 2rem;
      padding-right: 2rem;
  }
}

</style>
