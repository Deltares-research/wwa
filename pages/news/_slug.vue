<template>
  <article>
    <page-header
      :title="newsArticle.title"
      :sub-title="formattedDate"
      :hero-image-url="newsArticle.heroImage.url"
    />

    <section-blocks :sections="newsArticle.sections" />
  </article>
</template>

<script>
import fetchContent from '~/lib/fetch-content';
import SectionBlocks from '~/components/section-blocks/SectionBlocks';
import PageHeader from '~/components/page-header/PageHeader';
import query from './_slug.graphql';

export default {
  components: { PageHeader, SectionBlocks },
  layout: 'static-page-dark',
  async asyncData({ params }) {
    return {
      ...await fetchContent({ query, variables: { slug: params.slug }}),
    };
  },
  computed: {
    formattedDate() {
      return new Date(this.newsArticle.date).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    },
  },
};
</script>
