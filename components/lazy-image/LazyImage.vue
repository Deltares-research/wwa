<template>
  <clazy-load :src="src" class="lazy-image fixed-ratio"
    :style="`padding-bottom:${Math.round(srcHeight/srcWidth * 10000)/100}%`">
    <img :src="src" :alt="alt" slot="image" width="100%" />
    <div slot="placeholder">
      <p class="placeholder">{{alt}}</p>
    </div>
  </clazy-load>
</template>

<script>
import Vue from 'vue'
import ClazyLoad from 'vue-clazy-load'

Vue.use(ClazyLoad)

export default {
  props: {
    srcWidth: Number,
    srcHeight: Number,
    alt: String,
    src: String
  }
}
</script>

<style>
@import '../colors/colors.css';

.lazy-image {
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0;
}
.lazy-image .placeholder {
  padding: 1rem;
}
.fixed-ratio {
  padding: 0;
  position: relative;
  color: var(--ui--text--light);
  background-color: var(--ui--bg--light);
  overflow: hidden;
}
.fixed-ratio > * {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
</style>
