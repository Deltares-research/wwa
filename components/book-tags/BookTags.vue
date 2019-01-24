<template>
  <ul class="book-tags">
    <li
      class="book-tags__list-item"
      v-for="book in books"
      :key="book.slug"
    >
      <button class="tag tag--book" @click="$emit('selectLink', book.slug)" >{{ book.title }}</button>
    </li>
  </ul>
</template>

<script>

export default {
  props: ['books'],
  data: () => ({
    bookLimitMap: {}
  })
}
</script>

<style>
  .book-tags {
    margin: 0.5rem 0 1rem 0;
    padding: 0;
  }
  .book-tags__list-item {
    float: left;
    padding: 0;
    list-style: none;
    margin: 0 0.5rem 0.5rem 0;
  }
  .tag--book {
    background: var(--ui--white);
    margin: 0;
    cursor: pointer;
  }
</style>
