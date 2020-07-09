<template>
  <lazy-media>
    <div
      class="fixed-ratio"
      slot="content"
      :style="`padding-bottom:${aspectRatio}%`"
    >
      <iframe
        v-if="video.provider === 'qq'"
        allowfullscreen="allowfullscreen"
        frameborder="0"
        :src="`https://v.qq.com/txp/iframe/player.html?vid=${video.providerUid}`"
        width="100%"
        height="100%"
      />
      <iframe
        v-else-if="video.provider === 'youtube'"
        allowfullscreen="allowfullscreen"
        frameborder="0"
        :src="`//www.youtube.com/embed/${video.providerUid}`"
        width="100%"
        height="100%"
      />
      <iframe
        v-else-if="video.provider === 'vimeo'"
        allowfullscreen="allowfullscreen"
        frameborder="0"
        :src="`https://player.vimeo.com/video/${video.providerUid}?title=0&author=0&portrait=0&playbar=0&byline=0`"
        width="100%"
        height="100%"
      />
    </div>
    <div
      class="lazy-placeholder fixed-ratio"
      slot="placeholder"
      :style="`padding-bottom:${aspectRatio}%`"
    />
  </lazy-media>
</template>

<script>
import LazyMedia from '~/components/lazy-media/LazyMedia';

export default {
  props: {
    video: Object,
  },
  components: { LazyMedia },
  computed: {
    aspectRatio () {
      return this.video.height && this.video.width? Math.round(this.video.height/this.video.width * 10000)/100 : 62;
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
