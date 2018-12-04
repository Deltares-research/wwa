<template>
  <span
    :class="`tag tag--influence tag--${keyword.slug} keyword-tag ${active ? 'keyword-tag--active' : ''}`"

  >
    <span class="sr-only">remove </span>{{keyword.title }}
  </span>
</template>

<script>
export default {
  props: {
    keyword: Object,
    active: Boolean
  }
}
</script>

<style>
.keyword-tag {
  transition: opacity .25s;
  cursor: pointer;
  text-shadow: none;
}
.keyword-tag:not(.keyword-tag--active) {
  opacity: .5;
}
</style>
