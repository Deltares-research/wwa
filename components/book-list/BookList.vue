<template>
  <ul class="book-list">
    <li v-for="book in books" :key="book.slug">
      <h2 class="book-list__book-title">
        <nuxt-link class="book-list__book-title-link" :to="book.path">{{ book.title }}</nuxt-link>
      </h2>
      <slot v-if="hasSlotContent" :chapters="book.chapters"/>
      <chapter-list v-else :chapters="book.chapters" />
    </li>
  </ul>
</template>

<script>
import ChapterList from '~/components/chapter-list/ChapterList'

export default {
  components: { ChapterList },
  props: ['books'],
  computed: {
    hasSlotContent () {
      return this.$scopedSlots.hasOwnProperty('default')
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

@media (min-width: 600px) {
  .book-list__book-title {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }
}
</style>
