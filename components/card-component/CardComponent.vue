<template>
  <article>
    <nuxt-link v-bind:to="path">
      <h1>{{title}} {{count || ''}}</h1>
      <svg-icon v-if="theme" v-bind:icon="theme" />
      <p>{{body}}</p>
    </nuxt-link>
  </article>
</template>

<script>
import '~/components/colors/colors.css'
import '~/components/svg-icon/SvgIcon'

export default {
  // data () {
  //   return {
  //     path: '/'
  //   }
  // },
  props: [ 'body', 'count', 'image', 'path', 'slug', 'theme', 'title', 'video' ]
}
</script>

<style scoped>
article {
  --padding-v: calc(.5rem + .5vw);
  --padding-h: calc(1rem + 1vw);
  width: 100%;
  padding: var(--padding-v) var(--padding-h);
  background-color: var(--ui--white);
}
article a {
  color: inherit;
  text-decoration: none;
}
article h1,
article p {
  width: 100%;
}
</style>
