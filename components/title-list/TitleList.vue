<template>
  <ul class="title-list list--inline">
    <li
      class="h1 title-list__item"
      v-for="item in titles"
      :key="item.slug"
    >
      <nuxt-link
        v-if="active.every(t => t.slug !== item.slug)"
        :to="item.path"
      >
        <span class="sr-only">Go to book</span> {{ item.title }}
      </nuxt-link>
      <span v-else-if="!exclude">
        {{ item.title }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    titles: Array,
    active: Array,
    exclude: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.title-list__item {
  color: var(--ui--text--invert);
}

.title-list a {
  text-decoration: none;
  transition: .2s color;
  color: var(--ui--text--light);
}

.title-list a:hover {
  color: var(--ui--text--invert);
}
</style>
