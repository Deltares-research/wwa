<template>
  <picture class="avatar">
    <img v-bind:src="imgSrc">
    <figcaption>
    {{ name }}
    </figcaption>
  </picture>
</template>

<script>
import _defaultAvatarSrc from './assets/Portrait_Placeholder.png'

export default {
  props: {
    img: { type: Object },
    name: { type: String }
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
.avatar {
  position: relative;
  width: 100%;
  display: block;
  min-height: 3rem;
}

.avatar img {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  vertical-align: top;
  position: absolute;
  top: 0;
  left: 0;
}

.avatar figcaption {
  display: inline-block;
  vertical-align: top;
  padding-top: .4rem;
  padding-left: calc( 3rem + .7rem );
}
</style>
