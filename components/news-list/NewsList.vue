<template>
  <ul
    class="news-list"
  >
    <li
      v-for="article in newsArticles"
      :key="article.id"
      class="news-list__item"
    >
      <div class="news-list__item-image">
        <img
          v-if="article.heroImage"
          :srcset="`${article.heroImage}?auto=compress,format&w=300 300w,
                    ${article.heroImage}?auto=compress,format&w=600 600w,
                    ${article.heroImage}?auto=compress,format&w=900 900w`"
          sizes="(min-width: 768px) 290px, 100vw"
          :src="`${article.heroImage}?auto=compress,format&w=400`"
          alt=""
        >
      </div>
      <div class="news-list__item-content">
        <nuxt-link
          :to="`/news/${article.slug}`"
          class="news-list__item-title"
        >
          <component
            :is="showHeadingLevelTop ? 'h2' : 'h3'"
          >
            {{ article.title }}
          </component>
        </nuxt-link>
        <time
          class="news-list__item-date"
          :datetime="article.date"
        >
          {{ formatDate(article.date) }}
        </time>
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
    showHeadingLevelTop: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    },
  },
};
</script>

<style>
.news-list__item {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding-bottom: 1rem;
}

@media (--md-viewport) {
  .news-list__item {
    display: inline-flex;
    margin-top: 2.5rem;
    width: 50%;
  }

  .news-list__item:nth-child(odd) {
    padding-right: 1.5rem;
  }

  .news-list__item:nth-child(even) {
    padding-left: 1.5rem;
  }
}

.news-list__item:last-child {
  margin-bottom: 3rem;
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
    font-size: 1.5rem;
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
  margin-bottom: 1rem;
  width: 100%;
  height: 160px;
  object-fit: cover;
}

@media (--md-viewport) {
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
