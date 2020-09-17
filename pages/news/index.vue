<template>
  <div>
    <h1 class="h1">
      News
    </h1>

    <ul>
      <li
        v-for="article in allNewsArticles"
        :key="article.path"
      >
        <nuxt-link :to="{ name: 'news-slug', params: { slug: article.slug }}">
          <time :datetime="article.date">{{ article.date }}</time>
          {{ article.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import fetchContent from '~/lib/fetch-content';

export default {
  layout: 'static-page-dark',
  async asyncData () {
    const query = `
        {
          allNewsArticles {
            slug
            title
            date
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
</style>
