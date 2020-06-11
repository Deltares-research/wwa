<template>
  <div class="book-header">
    <h1
      v-if="title"
      class="book-title"
      :class="{ 'sr-only': titleIsOptional }"
    >
      {{ title }}
    </h1>
    <p
      v-if="body"
      v-html="body"
    >
    </p>
  </div>
</template>

<script>
export default {
  props: {
    body: String,
    title: String,
    titleIsOptional: Boolean
  }
}
</script>

<style>
.book-header {
  margin-bottom: 2rem;
}

.book-title {
  margin-bottom: 0.5rem;
}

@media (min-width: 1024px) {
  .book-header {
    margin-bottom: 4rem;
    max-width: 66%;
  }

  .book-title {
    font-size: 3rem;
  }
}
</style>
