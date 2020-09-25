<template>
  <article>
    <page-header
      :title="title"
      :sub-title="formattedDate"
      :hero-image-url="`${heroImage.imgixHost}${heroImage.value.path}`"
    />

    <section-blocks :sections="sections" />
  </article>
</template>

<script>
import SectionBlocks from '~/components/section-blocks/SectionBlocks';
import PageHeader from '~/components/page-header/PageHeader';

export default {
  components: { PageHeader, SectionBlocks },
  layout: 'static-page-dark',
  async asyncData({ params }) {
    const data = await import(`~/static/data/news/${params.slug}.json`);
    return data.default;
  },
  computed: {
    formattedDate() {
      return new Date(this.date).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    },
  },
};
</script>
