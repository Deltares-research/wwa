<template>
  <ul class="book-list">
    <li v-for="book in books" :key="book.slug">
      <h2 class="book-list__book-title">
        <a class="book-list__book-title-link" :href="book.path">{{ book.title }}</a>
      </h2>
      <slot v-if="hasSlotContent" :chapters="book.chapters" :limit="bookLimitMap[book.slug]"/>
      <chapter-list v-else :chapters="book.chapters" :limit="bookLimitMap[book.slug]"/>
      <button
        v-if="bookLimitMap[book.slug] < book.chapters.length"
        class="book-list__more"
        @click="increaseLimit(book.slug)">
        <span class="book-list__more-content">
          more on {{ book.title }} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="book-list__more-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path> <path fill="none" d="M0 0h24v24H0V0z"></path></svg>
        </span>
      </button>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import ChapterList from '~/components/chapter-list/ChapterList'

export default {
  components: { ChapterList },
  props: ['books'],
  data: () => ({
    bookLimitMap: {}
  }),
  mounted () {
    this.books.forEach(book => Vue.set(this.bookLimitMap, book.slug, 3))
  },
  computed: {
    hasSlotContent () {
      return this.$scopedSlots.hasOwnProperty('default')
    }
  },
  methods: {
    increaseLimit (slug) {
      Vue.set(this.bookLimitMap, slug, this.bookLimitMap[slug] + 3)
    }
  }
}
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
  display: block;
  width: 100%;
  border: none;
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
  padding: 0.5em 1em;
  border-radius: 2em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.book-list__more-chevron {
  fill: white;
  top: 50%;
  position: relative;
  transform: translateX(25%);
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
