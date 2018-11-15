<template>
  <ul class="chapter-list__list">
    <li v-for="chapter in limitedChapters" :key="chapter.slug">
      <a :href="chapter.path">{{ chapter.title }}</a>
    </li>
  </ul>
</template>

<script>
import sortBy from 'lodash/fp/sortBy'

export default {
  props: {
    chapters: {
      type: Array,
      default: () => []
    },
    sorted: {
      type: String,
      default: '',
      validator (value) {
        return ['', 'newest'].indexOf(value) !== -1
      }
    },
    limit: {
      type: Number,
      default: -1
    }
  },
  computed: {
    newestChapters () {
      return sortBy(['updatedAt'], this.chapters).reverse()
    },
    sortedChapters () {
      switch (this.sorted) {
        case 'newest':
          return this.newestChapters
        default:
          return this.chapters
      }
    },
    limitedChapters () {
      return this.limit === -1
        ? this.sortedChapters
        : this.sortedChapters.filter((_, index) => index + 1 <= this.limit)
    }
  }
}
</script>

<style>
.chapter-list__list {
  list-style: none;
  padding: 0;
}
</style>
