<template>
  <lazy-media>
    <div
      class="fixed-ratio"
      slot="content"
      :style="`padding-bottom:${Math.round(videoHeight/videoWidth * 10000)/100}%`"
    >
      <iframe
        v-if="videoChina"
        allowfullscreen="allowfullscreen"
        frameborder="0"
        :src="`https://v.qq.com/txp/iframe/player.html?vid=${chinaVideoId}`"
        width="100%"
        height="100%"
      />
      <iframe
        v-else-if="videoProvider === 'youtube'"
        allowfullscreen="allowfullscreen"
        frameborder="0"
        :src="`//www.youtube.com/embed/${videoProviderUid}`"
        width="100%"
        height="100%"
      />
      <iframe
        v-else-if="videoProvider === 'vimeo'"
        allowfullscreen="allowfullscreen"
        frameborder="0"
        :src="`https://player.vimeo.com/video/${videoProviderUid}?title=0&author=0&portrait=0&playbar=0&byline=0`"
        width="100%"
        height="100%"
      />
    </div>
    <div
      class="lazy-placeholder fixed-ratio"
      slot="placeholder"
      :style="`padding-bottom:${Math.round(videoHeight/videoWidth * 10000)/100}%`"
    />
  </lazy-media>
</template>


<script>
import LazyMedia from '~/components/lazy-media/LazyMedia';

export default {
  props: {
    videoWidth: Number,
    videoHeight: Number,
    videoProvider: String,
    videoProviderUid: String,
    videoChina: String,
  },
  components: { LazyMedia },
  computed: {
    chinaVideoId () {
      const match = /page\/(\w+)/.exec(this.videoChina);
      return match ? match[1] : null;
    },
  },
};
</script>
