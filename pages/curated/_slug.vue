<template>
  <div>
    <page-header
      :icon-url="iconUrl"
      :title="title"
      :hero-image-url="`${heroImage.imgixHost}${heroImage.value.path}`"
    />

    <section-blocks
      :sections="sections"
      :show-heading-level-top="true"
    />
  </div>
</template>

<script>
  import seoHead from '~/lib/seo-head';
  import PageHeader from '~/components/page-header/PageHeader';
  import SectionBlocks from '~/components/section-blocks/SectionBlocks';

  export default {
    layout: 'static-page-dark',
    components: {
      PageHeader,
      SectionBlocks,
    },
    async asyncData({ params }) {
      const data = await import(`~/static/data/features/${params.slug}.json`);
      return data.default;
    },
    head() {
      return seoHead(this.seo, this.$route.path);
    },
  };
</script>
