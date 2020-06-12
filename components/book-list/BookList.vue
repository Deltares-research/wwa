<template>
  <ul class="book-list">
    <li
      v-for="book in books"
      :key="book.slug"
      :id="book.slug"
    >
      <h2 class="book-list__book-title">
        <nuxt-link
          class="book-list__book-title-link"
          :to="book.path"
        >
          {{ book.title }}
        </nuxt-link>
      </h2>
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
      <nuxt-link
        class="book-list__more"
        :to="book.path"
      >
        <span class="book-list__more-content">
          {{ book.title }} <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="book-list__more-chevron"
          ><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /><path
            d="M0 0h24v24H0z"
            fill="none"
          /></svg>
        </span>
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
.book-list__heading {
  margin: 0;
}

.book-list {
  list-style: none;
  padding: 0px;
}

.book-list__book-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  line-height: 2.1875rem;
  font-weight: 500;
}

.book-list__book-title-link {
  text-decoration: none;
}

.book-list__book-title-link:hover,
.book-list__book-title-link:focus {
  text-decoration: underline;
}

.book-list__more {
  display: flex;
  justify-content: center;
  width: 100%;
  border: none;
  text-decoration: none;
  color: var(--ui-white);
  background-color: transparent;
  position: relative;
  padding: 0;
  z-index: 0;
  margin-top: calc(50px - 1rem);
  margin-bottom: calc(50px - 1rem);
}

.book-list__more-content{
  background-color: var(--ui--blue--bg);
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0.5rem 1rem 0.5rem 1.5rem ;
  border-radius: 2em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.book-list__more-chevron {
  fill: white;
}

.book-list__more:before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: var(--ui--blue--bg);
  top: calc(50% - 2px);
  z-index: -1;
}

@media (min-width: 600px) {
  .book-list__book-title {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }

  .book-list__more {
    margin-top: 0;
  }
}
</style>
