<template>
  <article class="card-component">
    <nuxt-link :to="path">
      <p class="subtitle h3">
        {{ subtitle }}
      </p>
      <h2>{{ title }}</h2>
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
    title: String,
  },
};
</script>

<style>
.card-component {
  width: 100%;
  padding: 1.5rem 1rem 0;
  box-sizing: border-box;
  color: var(--white);
}

.card-component:hover {
  transform: translate(0, -.5rem);
  transition: transform .25s;
}

.card-component::after {
  content: '';
  display: block;
  height: 5rem;
  background-color: var(--white);
  border-right: 2rem solid var(--black-secondary);
}

.card-component .subtitle {
  text-transform: uppercase;
  color: var(--blue-secondary);
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
