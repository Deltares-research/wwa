<template>
  <article>
    <nuxt-link v-bind:to="path">
      <h1>{{title}}</h1>
      <svg-icon v-if="theme" v-bind:icon="theme" />
      <p>{{body}}</p>
      <div></div>
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
  props: [ 'body', 'image', 'path', 'slug', 'theme', 'title', 'video' ]
}
</script>

<style scoped>
article div {
  background-color: var(--ui--white);
}

article:hover
{
   transform:scale(1);
}

article
{
  position:relative;
  width:100%;
  transform:scale(0.7);
}

article div
{
  position:absolute;
  z-index:0;
  right: 0;
  top:1.66em;
  bottom:0;
  padding: var(--padding-v) var(--padding-h);
  --padding-v: calc(.5rem + .5vw);
  --padding-h: calc(1rem + 1vw);
  width: 10%;
}

article a{
   color: var(--ui--white);
   text-decoration: none;
}

article h1,
article p {
  width: 72%;
  z-index: 10;
}
</style>
