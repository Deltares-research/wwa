<template>
  <div>
    <page-header
      :icon-url="feature.icon.url"
      :title="feature.title"
      :hero-image-url="feature.heroImage.url"
    />

    <section-blocks
      :sections="feature.sections"
    />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import PageHeader from '~/components/page-header/PageHeader';
  import SectionBlocks from '~/components/section-blocks/SectionBlocks';
  import query from './_slug.graphql';

  export default {
    layout: 'static-page-dark',
    components: {
      PageHeader,
      SectionBlocks,
    },
    async asyncData({ params }) {
      return {
        ...await fetchContent({ query, variables: { slug: params.slug } }),
      };
    },
  };
</script>
