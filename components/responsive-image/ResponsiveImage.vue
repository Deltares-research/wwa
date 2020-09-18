<template>
  <lazy-media>
    <span
      class="lazy-image fixed-ratio"
      :style="`padding-bottom:${100 / (srcWidth / srcHeight)}%`"
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
    </span>
    <div
      class="lazy-placeholder fixed-ratio"
      slot="placeholder"
      :style="`padding-bottom:${100 / (srcWidth / srcHeight)}%`"
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
