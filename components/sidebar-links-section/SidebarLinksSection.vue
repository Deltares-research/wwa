<template>
  <section class="sidebar-links-section">
  <h3 class="title">{{ title }}</h3>
  <ul class="list--inline" v-bind:class="title">
    <li v-for="link in links" v-bind:key="link.slug">
      <nuxt-link v-if="title !== 'keywords'" v-bind:to="link.path">{{ link.title }}</nuxt-link>
      <nuxt-link v-else class="tag" v-bind:to="link.path">{{ link.title }}</nuxt-link>
    </li>
  </ul>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    links: Array
  }
}
</script>

<style>
@import '../colors/colors.css';

.sidebar-links-section .title {
  text-transform: uppercase;
  color: var(--ui--text--light);
  font-size: .9rem;
}

.sidebar-links-section a {
  color: var(--ui--text);
  display: inline-block;
}

.sidebar-links-section .tag {
  color: inherit;
}

</style>
