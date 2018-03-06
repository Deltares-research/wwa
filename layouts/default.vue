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

<style src="./base.css"></style>
