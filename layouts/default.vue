<template>
  <main>
    <nav class="link-menu">
      <nuxt-link class="link-menu__item link-menu__item--home h1" to="/" title="Go home"><span class="sr-only">Return to the homepage</span>World<br />Water<br />Atlas</nuxt-link>
      <nuxt-link class="link-menu__item link-menu__item--about h3" to="/about">About</nuxt-link>
      <nuxt-link class="link-menu__item link-menu__item--submit h3" to="/submit-a-story-to-world-water-atlas">Submit a story</nuxt-link>
    </nav>
    <globe-component v-bind:is="GlobeComponent" class="globe-component" />
    <nuxt/>

  </main>
</template>
<script>
export default {
  beforeCreate () {
    this.GlobeComponent = () => ({
      component: import(/* webpackChunkName: "globe-component" */'~/components/globe-component/GlobeComponent.vue')
    })
  }
}
</script>

<style>
@import '../components/colors/colors.css';

html {
  padding: 0;
  margin: 0;
}

main {
  width: 0;
  height: 0; /* do not obstruct globe */
  overflow: visible;
}

.globe-component {
  position: fixed;
  z-index: -10;
  top:0;
}

.link-menu {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  color: var(--ui--text--invert);
  z-index: 1;
}

.link-menu .link-menu__item {
  float: right;
  padding: 0 1rem .8rem;
  opacity: .6;
  transition: .5s opacity;
  font-weight: normal;
  margin-top: 1.7rem;
  text-decoration: none;
}

.link-menu__item:hover,
.link-menu__item:focus,
.link-menu__item:active {
  text-decoration: none;
  opacity: 1;
  color: var(--ui--text--invert);
}

.link-menu .link-menu__item--home {
  text-decoration: none;
  font-weight: normal;
  position: absolute;
  padding: 1.4rem 1rem;
  background-color: var(--ui--black--trans);
  z-index: 100;
  margin-top: 0;
}

.link-menu .link-menu__item--submit {
  background: white;
  margin-top: .7rem;
  padding-top: .8rem;
  color: var(--ui--text);
}
</style>
