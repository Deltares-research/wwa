<template>
  <ul class="book-list">
    <li
      v-for="book in books"
      :key="book.slug"
      :id="book.slug"
      class="book-list__item"
    >
      <h2 class="book-list__book-title">
        <nuxt-link
          class="book-list__book-title-link"
          :to="book.path"
        >
          {{ book.title }}
        </nuxt-link>
      </h2>
      <div class="book-list__content">
        <slot
          v-if="hasSlotContent"
          :chapters="book.chapters"
          :limit="bookLimitMap[book.slug]"
        />
        <chapter-list
          v-else
          :chapters="book.chapters"
          :limit="bookLimitMap[book.slug]"
        />
      </div>
      <nuxt-link
        class="book-list__more-link"
        :to="book.path"
      >
        View more {{ book.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue';
import ChapterList from '~/components/chapter-list/ChapterList';

export default {
  components: { ChapterList },
  props: {
    books: Array,
  },
  data: () => ({
    bookLimitMap: {},
  }),
  mounted () {
    this.books.forEach(book => Vue.set(this.bookLimitMap, book.slug, 3));
  },
  computed: {
    hasSlotContent () {
      return this.$scopedSlots.hasOwnProperty('default');
    },
  },
};
</script>

<style>
.book-list {
  list-style: none;
  padding: 0px;
}

.book-list__item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
}

.book-list__item:last-child {
  margin-bottom: 1rem;
}

.book-list__book-title {
  flex: 0 0 100%;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 1.1;
  font-weight: 500;
}

.book-list__book-title-link {
  text-decoration: none;
}

.book-list__book-title-link:hover,
.book-list__book-title-link:focus {
  text-decoration: underline;
}

.book-list__content {
  flex: 0 0 100%;
}

.book-list__more-link {
  display: inline-block;
  padding: 10px 15px;
  background: var(--blue-tertiary);
  font-weight: bold;
  text-decoration: none;
  color: var(--blue-primary);
  border-radius: 5px;
}

.book-list__more-link:hover,
.book-list__more-link:focus {
  color: var(--blue-primary);
}

@media (--sm-viewport) {
  .book-list__book-title {
    font-size: 2rem;
    line-height: 2.25rem;
  }

  .book-list__more {
    margin-top: 0;
  }
}
</style>
