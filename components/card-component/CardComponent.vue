<template>
  <transition name="slide-up">
    <article class="card-component" v-if="show">
      <nuxt-link v-bind:to="path">
        <h1>{{title}} {{count || ''}}</h1>
        <svg-icon v-if="theme && theme.slug" v-bind:icon="theme.slug" />
        <p>{{body}}</p>
      </nuxt-link>
    </article>
  </transition>
</template>

<script>
import SvgIcon from '~/components/svg-icon/SvgIcon'

export default {
  components: {
    SvgIcon
  },
  props: [ 'body', 'count', 'delay', 'image', 'path', 'slug', 'theme', 'title', 'video' ],
  data () {
    return {
      show: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.show = true
    }, this.delay)
  }
}
</script>

<style>
@import '../colors/colors.css';
@import '../animations/animations.css';

/* end card show animation */
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
