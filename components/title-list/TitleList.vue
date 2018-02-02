<template>
  <ul class="title-list list--inline">
    <li class="h1 title-list-item" v-for="item in titles" v-bind:key="item.slug">
      <nuxt-link v-if="active.every(t => t.slug !== item.slug)" v-bind:to="item.path">
        <span class="sr-only">Go to book</span> {{item.title}}
      </nuxt-link>
      <span v-else-if="!exclude">
        {{item.title}}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    titles: Array,
    active: [ Array, Object ],
    exclude: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.title-list-item {
  text-shadow: 0 0 1rem var(--ui--black);
}

.title-list a {
  opacity: .5;
  color: var(--ui--text--invert);
  text-decoration: none;
  transition: .2s opacity;
}

.title-list a:hover {
  opacity: 1;
}
</style>
