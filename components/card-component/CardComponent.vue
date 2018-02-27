<template>
  <article class="card-component">
    <nuxt-link v-bind:to="path">
      <h1>{{title}} {{count || ''}}</h1>
      <svg-icon v-if="theme && theme.slug" v-bind:icon="theme.slug" />
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
  props: {
    body: String,
    count: Number,
    delay: Number,
    path: String,
    slug: String,
    theme: Object,
    title: String
  }
}
</script>

<style>
@import '../colors/colors.css';

/* end card show animation */
.card-component {
  --padding-v: calc(.5rem + .5vw);
  --padding-h: calc(1rem + 1vw);
  width: 100%;
  padding: var(--padding-v) var(--padding-h);
  background-color: rgba(255, 255, 255, .2);
  box-sizing: border-box;
  color: var(--ui--text--invert);
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
