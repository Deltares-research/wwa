<template>
  <main class="layout layout--globe">
    <main-menu variant="dark" />
    <transition name="fadeIn" mode="out-in">
      <globe-component :is="GlobeComponent" class="globe-component" :class="{ 'globe-component--right': globePositionRight }"/>
    </transition>
    <nuxt/>

  </main>
</template>
<script>
import { mapState } from 'vuex'
import MainMenu from '~/components/main-menu/MainMenu'

export default {
  head () {
    return {
      htmlAttrs: {
        lang: this.$route.params.language,
      }
    }
  },
  beforeCreate () {
    this.GlobeComponent = () => ({
      component: import(/* webpackChunkName: "globe-component" */'~/components/globe-component/GlobeComponent.vue')
    })
  },
  components: { MainMenu },
  computed: {
    ...mapState(['globePositionRight'])
  }
}
</script>

<style src="./base.css"></style>
<style>
.globe-component {
  transform: none;
  transition: transform 0.5s ease-in-out;
}

@media only screen and (min-width: 1024px) {
.globe-component--right {
    transform: translateX(33%);
  }
}

@media only screen and (min-width: 1440px) {
  .globe-component--right {
    transform: translateX(25%);
  }
}
</style>
