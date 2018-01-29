<template>
  <div>
    <img v-bind:src="avatarSrc">
  </div>
  </template>

<script>
import '~/components/colors/colors.css'
import _defaultAvatarSrc from './assets/Portrait_Placeholder.png'

export default {
  props: {
    avatar: {
      type: Object
    },
    name: {
      type: String
    }
    // 'storytellerAvatar',
    // 'storyteller',
  },
  computed: {
    avatarSrc: function () {
      var src = _defaultAvatarSrc
      if (this.avatar && this.avatar.imgixHost) {
        src = this.avatar.imgixHost + this.avatar.value.path
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
}
</style>
