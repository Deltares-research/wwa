<template>
  <article class="card-component">
    <nuxt-link v-bind:to="path">
      <h1>{{title}} {{count || ''}}</h1>
      <svg-icon v-if="theme" v-bind:icon="theme.slug" />
      <p>{{body}}</p>
    </nuxt-link>
  </article>
</template>

<script>
import SvgIcon from '~/components/svg-icon/SvgIcon'

export default {
  components: {
    SvgIcon
  },
  props: [ 'body', 'count', 'image', 'path', 'slug', 'theme', 'title', 'video' ]
}
</script>

<style>
@import '../colors/colors.css';
.card-component {
  --padding-v: calc(.5rem + .5vw);
  --padding-h: calc(1rem + 1vw);
  width: 100%;
  padding: var(--padding-v) var(--padding-h);
  background-color: var(--ui--white);
  box-sizing: border-box;
  color: var(--ui--text);
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
