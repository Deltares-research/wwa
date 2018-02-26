<template>
  <dl class="link-list">
    <template v-for="link in links">
        <dt v-if="link.slug" v-bind:class="`h3 invert ${link.slug}`">
          <nuxt-link v-bind:to="link.path">{{ link.title }}</nuxt-link>
        </dt>
    </template>
  </dl>
</template>

<script>
export default {
  props: {
    links: Array
  }
}
</script>

<style>
@import '../typography/typography.css';
@import '../colors/colors.css';

.link-list {
  padding: 0 1rem 1rem 0;
  max-width: 10rem;
  max-height: 50vh;
  color: var(--ui--text--invert);
}
.link-list dd p {
  font-size: var(--base-size-units);
}
.link-list a {
  text-decoration: none;
}
.link-list dt,
.link-list dd {
  margin: 0;
  padding: 0;
  position: relative;
}
.link-list dd + dt {
  margin-top: .5rem;
}
.link-list dt {
  opacity: .6;
  transition: .5s opacity;
}
.link-list dt:hover {
  opacity: 1;
}
</style>
