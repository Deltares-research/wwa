<template>
  <div>
    <img v-bind:src="imgSrc">
    {{name}}
  </div>

  </template>

<script>
import '~/components/colors/colors.css'
import _defaultAvatarSrc from './assets/Portrait_Placeholder.png'

export default {
  props: {
    img: {
      type: Object
    },
    name: {
      type: String
    }
    // 'storytellerAvatar',
    // 'storyteller',
  },
  computed: {
    imgSrc: function () {
      var src = _defaultAvatarSrc
      if (this.img && this.img.imgixHost) {
        src = this.img.imgixHost + this.img.value.path
      }
      return src
    }
  }
}
</script>

<style>
img {
  width: 6rem;
  height: 6rem;
  display:block;
}
</style>
