<template>
  <nuxt-link
    :to="url"
    class="filter-tag"
    :class="{ 'filter-tag--selected': isSelected, 'filter-tag--removable': isRemovable }"
  >
    <img
      v-if="icon"
      :src="`${icon.imgixHost}${icon.value.path}`"
      alt=""
      class="filter-tag__icon"
    >
    {{ title }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: String,
    url: String,
    icon: Object,
    isSelected: Boolean,
    isRemovable: Boolean
  }
}
</script>

<style>
.filter-tag {
  display: flex;
  align-items: center;
  padding: .3rem 1rem .5rem 1rem;
  background: var(--ui--grey);
  font-size: .825rem;
  font-weight: bold;
  text-decoration: none;
  color: var(--ui--white);
  border-radius: 5px;
}

.filter-tag:hover {
  color: var(--ui--white);
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

.filter-tag--removable {
  padding-right: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23ffffff' stroke-width='7' d='M25 25L7.3 42.7 25 25 7.3 7.3 25 25 42.7 7.3 25 25l17.7 17.7z' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: .8rem;
  background-position: center right .5rem;
}

.filter-tag__icon {
  display: block;
  margin-right: .5rem;
  height: 1.3rem;
}
</style>
