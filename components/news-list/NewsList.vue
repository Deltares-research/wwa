<template>
  <ul
    class="news-list"
  >
    <li
      v-for="article in newsArticles"
      :key="article.id"
      class="news-list__item"
    >
      <div class="news-list__item-content">
        <nuxt-link :to="`/news/${article.slug}`" class="news-list__item-title">
          <h2>{{ article.title }}</h2>
        </nuxt-link>
        <time class="news-list__item-date" :datetime="article.date">{{ formatDate(article.date) }}</time>
      </div>
      <div class="news-list__item-image">
        <img
          v-if="article.heroImage"
          :src="`${article.heroImage.url}?auto=compress,format&w=600`"
          alt="">
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    newsArticles: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })
    }
  }
}
</script>

<style>
.news-list__item {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  padding-bottom: 1rem;
}

@media (--md-viewport) {
  .news-list__item {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2.5rem;
  }
}

.news-list__item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.news-list__item:first-child {
  margin-top: 0;
}

.news-list__item-title {
  display: inline-block;
  text-decoration: none;
  font-size: 1.25rem;
  line-height: 1;
  color: var(--orange);
  margin-bottom: .25rem;
}

.news-list__item-title:hover,
.news-list__item-title:focus {
  color: var(--orange);
  text-decoration: underline;
}

@media (--md-viewport) {
  .news-list__item-title {
    margin-bottom: .5rem;
    font-size: 2rem;
  }
}

.news-list__item-date {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1rem;
}

@media (--md-viewport) {
  .news-list__item-date {
    margin-bottom: 0;
    line-height: 1;
  }
}

.news-list__item-image img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

@media (--md-viewport) {
  .news-list__item-image {
    flex: 0 0 290px;
    margin-left: 2rem;
  }

  .news-list__item-image img {
    height: 197px;
  }
}

.news-list__item-date {
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.2;
}

@media (--md-viewport) {
  .news-list__item-date {
    font-size: 1.5rem;
    line-height: 1;
  }
}
</style>
