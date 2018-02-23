<template>
  <main>
    <nuxt-link class="home h1" to="/" title="Go home"><span class="sr-only">Return to the homepage</span>World Water<br />Atlas</nuxt-link>
    <globe-component class="globe-component" />
    <nuxt/>
  </main>
</template>
<script>
import GlobeComponent from '~/components/globe-component/GlobeComponent'

export default {
  components: { GlobeComponent }
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

.home,
.home:hover {
  display: block;
  color: var(--ui--text--invert);
  text-decoration: none;
  position: relative;
  z-index: 100;
  padding: 1rem;
  font-weight: normal;
}

.globe-component {
  position: fixed;
  z-index: -1;
  top:0;
}
</style>
