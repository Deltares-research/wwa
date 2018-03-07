<template>
    <header v-if="chapter" class="narrative-header">
      <p class="narrative-header__book h2">
        <nuxt-link  v-bind:to="book.path">
          <span class="sr-only">Go to book</span> {{ book.title }}
        </nuxt-link>
      </p>
      <h1 class="narrative-header__chapter">
        {{ chapter.title }}
      </h1>
    </header>
    <header v-else class="narrative-header">
      <h1 class="narrative-header__book h2">
        {{ book.title }}
      </h1>
    </header>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    },
    chapter: {
      type: Object,
      required: false
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.narrative-header {
  padding-bottom: 1rem;
}

.narrative-header__book,
.narrative-header__chapter {
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0 auto;
}

.narrative-header__book {
  color: var(--ui--text--light);
  position: relative;
  text-transform: uppercase;
}

.narrative-header__book a {
  color: inherit;
  text-decoration: none;
  transition: .25s color;
}
.narrative-header__book a:hover {
  color: var(--ui--text--invert);
}

.narrative-header__chapter {
  color: var(--ui--text--invert);
}
</style>
