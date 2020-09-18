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
import fetchContent from '~/lib/fetch-content';
import NewsList from '@/components/news-list/NewsList';

export default {
  components: { NewsList },
  layout: 'static-page-dark',
  async asyncData () {
    const query = `
        {
          allNewsArticles {
            slug
            title
            date
            heroImage {
              url
            }
          }
        }
      `;

    return {
      ...await fetchContent(query),
    };
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
