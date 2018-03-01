<template>
  <clazy-load v-bind:src="src" class="lazy-image fixed-ratio"
    v-bind:style="`padding-bottom:${Math.round(srcHeight/srcWidth * 10000)/100}%`">
    <img v-bind:src="src" v-bind:alt="alt" slot="image" width="100%" />
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
  margin: auto;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  padding: 1rem;
}
.fixed-ratio {
  padding: 0;
  position: relative;
  color: var(--ui--text--light);
  background-color: var(--ui--bg--light);
}
.fixed-ratio > * {
  position: absolute;
}
</style>
