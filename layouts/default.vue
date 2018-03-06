<template>
  <main class="layout layout--globe">
    <main-menu variant="dark" />
    <transition name="fadeIn" mode="out-in">
      <globe-component v-bind:is="GlobeComponent" class="globe-component" />
    </transition>
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
@import '../components/animations/animations.css';

html {
  padding: 0;
  margin: 0;
}

.layout {
  width: 0;
  height: 0; /* minimise obstruction of globe */
  overflow: visible;
}

.globe-component {
  position: fixed;
  z-index: -10;
  top:0;
}

</style>
