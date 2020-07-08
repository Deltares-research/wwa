<template>
  <lazy-media>
    <picture
      :src="src"
      class="lazy-image fixed-ratio"
      :style="`padding-bottom:${Math.round(srcHeight/srcWidth * 10000)/100}%`"
      slot="content"
    >
      <transition name="fade">
        <img
          :src="src"
          v-show="isLoaded"
          :alt="alt"
          width="100%"
          @load="onLoad"
        >
      </transition>
    </picture>
    <div
      class="lazy-placeholder fixed-ratio"
      slot="placeholder"
      :style="`padding-bottom:${Math.round(srcHeight/srcWidth * 10000)/100}%`"
    />
  </lazy-media>
</template>


<script>
import LazyMedia from '~/components/lazy-media/LazyMedia';

export default {
  props: {
    srcWidth: Number,
    srcHeight: Number,
    alt: String,
    src: String,
  },
  data () {
    return {
      isLoaded: false,
    };
  },
  components: { LazyMedia },
  methods: {
    onLoad () {
      this.isLoaded = true;
    },
  },
};
</script>

<style>
  .fixed-ratio {
    padding: 0;
    position: relative;
    background-color: var(--blue-secondary);
  }

  .fixed-ratio > * {
    position: absolute;
  }
</style>
