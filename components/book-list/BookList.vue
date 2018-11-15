<template>
  <ul class="book-list__list">
    <li v-for="book in books" :key="book.slug">
      <h2 class="book-list__book-title">
        <a class="book-list__book-title-link" :href="book.path">{{ book.title }}</a>
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

.book-list__list {
  list-style: none;
  padding: 20px;
}

.book-list__list > *:not(:last-child) {
  margin-bottom: 3rem;
}

.book-list__book-title {
  margin-bottom: 0.5rem;
}

.book-list__book-title-link {
  text-decoration: none;
}

.book-list__book-title-link:hover,
.book-list__book-title-link:focus {
  text-decoration: underline;
}
</style>
