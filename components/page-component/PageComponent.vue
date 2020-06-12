<template>
  <article class="page-component">
    <page-body
      :body="page.body"
      :images="page.images"
      :graphs="page.graphs"
      :title="page.title"
      :video="page.video"
      :mapbox-style="page.mapboxStyle"
      :links="page.links"
      :partner="page.partner"
      :influences="page.influences"
      :goals="page.goals"
      :methodologies="page.methodologies"
      :keywords="page.keywords"
      :storyteller="page.storyteller"
      :theme="page.theme"
    />
  </article>
</template>

<script>
import PageBody from '~/components/page-body/PageBody'

export default {
  props: {
    page: { type: Object },
  },
  components: {
    PageBody,
  },
}
</script>

<style>
.page-component {
  min-height: 25vh;
  max-width: 44rem;
  margin: 3rem auto 0 auto;
}

@media only screen and (min-width: 600px) {
  .page-component {
    margin: 3.75rem auto 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/*
* style rules for a minimal print layout
*/

@media print {
  /*
  ** Below only works in normal donument flow
  ** chapter-column needs to be set relative for
  ** this to work
  */
  .page-component {
    page-break-after: always;
  }
}
</style>
