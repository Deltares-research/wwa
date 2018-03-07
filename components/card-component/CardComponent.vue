<template>
  <article class="card-component">
    <nuxt-link v-bind:to="path">
      <p class="subtitle h2">{{ subtitle }}</p>
      <h1>{{title}}</h1>
      <p>{{body}}</p>
    </nuxt-link>
  </article>
</template>

<script>

export default {
  props: {
    body: String,
    count: Number,
    path: String,
    slug: String,
    subtitle: String,
    theme: Object,
    title: String
  }
}
</script>

<style>
@import '../colors/colors.css';

.card-component {
  width: 100%;
  padding: 2rem;
  background-color: var(--ui--bg--light);
  box-sizing: border-box;
  color: var(--ui--text);
}
.card-component .subtitle {
  text-transform: uppercase;
}
.card-component a {
  color: inherit;
  text-decoration: none;
}
.card-component h1,
.card-component p {
  width: 100%;
}
</style>
