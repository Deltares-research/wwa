<template>
  <div class="avatar">
    <img v-bind:src="imgSrc">
    {{name}}
  </div>

  </template>

<script>
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
.avatar img {
  width: 6rem;
  height: 6rem;
  display:block;
}

.avatar{
  display:inline-block;
  margin:1rem;
  padding:1rem;
  text-align:center;
}
</style>
