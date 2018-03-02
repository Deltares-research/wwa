<template>
  <main>
    <main-menu variant="dark" />
    <globe-component v-bind:is="GlobeComponent" class="globe-component" />
    <nuxt/>

  </main>
</template>
<script>
import MainMenu from '~/components/main-menu/MainMenu'

export default {
  beforeCreate () {
    this.GlobeComponent = () => ({
      component: import(/* webpackChunkName: "globe-component" */'~/components/globe-component/GlobeComponent.vue')
    })
  },
  components: { MainMenu }
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

</style>
