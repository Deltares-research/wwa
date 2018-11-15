<template>
  <ul class="book-list__list">
    <li v-for="book in books" :key="book.slug">
      <h3 class="book-list__book-title"><a :href="book.path">{{ book.title }}</a></h3>
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
  padding: 0;
}

.book-list__book-title {
  margin: 0;
}
</style>
