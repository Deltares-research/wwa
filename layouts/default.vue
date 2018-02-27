<template>
  <main>
    <nav class="link-menu">
      <nuxt-link class="home h1" to="/" title="Go home"><span class="sr-only">Return to the homepage</span>World<br />Water<br />Atlas</nuxt-link>
      <nuxt-link class="about h3" to="/about">About</nuxt-link>
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
}
.link-menu a:not(.home) {
  float: right;
  padding: 1rem;
  opacity: .6;
  transition: .5s opacity;
  font-weight: normal;
}
.link-menu a,
.link-menu a:hover,
.link-menu a:focus,
.link-menu a:active {
  text-decoration: none;
}
a.home {
  display: block;
  text-decoration: none;
  font-weight: normal;
  position: absolute;
  padding: 1rem;
  background-color: var(--ui--black--trans);
  z-index: 100;
}

.link-menu a:hover {
  opacity: 1;
  color: var(--ui--text--invert);
}
</style>
