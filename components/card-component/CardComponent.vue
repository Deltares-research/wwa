<template>
  <article class="card-component">
    <nuxt-link v-bind:to="path">
      <p class="subtitle h3">{{ subtitle }}</p>
      <h2>{{title}}</h2>
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
  padding: 2rem 1rem 0;
  box-sizing: border-box;
  color: var(--ui--white);
}

.card-component:hover {
  transform: translate(0, -.5rem);
  transition: transform .25s;
}

.card-component::after {
  content: '';
  display: block;
  height: 5rem;
  background-color: var(--ui--white);
  border-right: 2rem solid var(--ui--bg--light);
}

.card-component .subtitle {
  text-transform: uppercase;
  color: var(--ui--text--light);
  margin: 0;
}
.card-component a {
  color: inherit;
  text-decoration: none;
}
.card-component h2,
.card-component p {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
