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
import PageBody from '~/components/page-body/PageBody';

export default {
  props: {
    page: { type: Object },
  },
  components: {
    PageBody,
  },
};
</script>

<style>
.page-component {
  min-height: 25vh;
  margin: 2rem 1rem 0 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--black-tertiary);
}

.page-component:first-of-type {
  position: relative;
  margin-top: -8rem;
}

.page-component:last-of-type {
  margin-bottom: 0;
}

@media (--md-viewport) {
  .page-component {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4rem;
    max-width: 45rem;
  }

  .page-component:first-of-type {
    margin-top: -5rem;
  }
}

@media (--lg-viewport) {
  .page-component {
    margin-left: 2rem;
    margin-right: 2rem;
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
