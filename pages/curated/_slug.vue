<template>
  <div>
    <page-header
      :icon-url="icon.url"
      :title="title"
      :hero-image-url="`${heroImage.imgixHost}${heroImage.value.path}`"
    />

    <section-blocks
      :sections="sections"
    />
  </div>
</template>

<script>
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
  };
</script>
