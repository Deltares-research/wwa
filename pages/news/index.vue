<template>
  <div class="layout-section ">
    <div class="layout-section__container">
      <h1 class="news__title">
        News
      </h1>

      <news-list :news-articles="allNewsArticles" />
    </div>
  </div>
</template>

<script>
import seoHead from '~/lib/seo-head';
import NewsList from '@/components/news-list/NewsList';

export default {
  components: { NewsList },
  layout: 'static-page-dark',
  async asyncData({ params }) {
    const data = await import(`~/static/data/news/index.json`);
    return data.default;
  },
  head() {
    return seoHead(this.seo, this.$route.path);
  },
};
</script>

<style>
.news__title {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.2;
  color: var(--blue-tertiary);
}

@media (--md-viewport) {
  .news__title {
    margin-bottom: 2rem;
    font-size: 3.75rem;
  }
}
</style>
