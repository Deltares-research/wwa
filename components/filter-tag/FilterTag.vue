<template>
  <nuxt-link
    :to="url"
    class="filter-tag"
    :class="{ 'filter-tag--selected': isSelected }"
  >
    {{ title }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: String,
    url: String,
    isSelected: Boolean
  }
}
</script>

<style>
.filter-tag {
  display: inline-block;
  padding: .3rem 1rem .5rem 1rem;
  background: var(--ui--grey);
  font-size: .825rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
}

@media (min-width: 600px) {
  .filter-tag {
    font-size: 1rem;
  }
}

.filter-tag--selected {
  background: var(--ui--blue--light);
  color: var(--ui--black);
}

.filter-tag--selected:hover,
.filter-tag--selected:focus {
  color: var(--ui--black);
}
</style>
