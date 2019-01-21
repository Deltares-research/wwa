<template>
  <lazy-media>
    <div
      class="fixed-ratio"
      slot="content"
      :style="`padding-bottom:${Math.round(videoHeight/videoWidth * 10000)/100}%`"
    >
      <iframe v-if="videoProvider === 'youtube'" allowfullscreen="allowfullscreen" frameborder="0"
        :src="`//www.${videoProvider}.com/embed/${videoProviderUid}`" width="100%" height="100%">
      </iframe>
      <iframe v-else-if="videoProvider === 'vimeo'" allowfullscreen="allowfullscreen" frameborder="0"
        :src="`https://player.vimeo.com/video/${videoProviderUid}?title=0&author=0&portrait=0&playbar=0&byline=0`" width="100%" height="100%">
      </iframe>
    </div>
    <div
      class="lazy-placeholder fixed-ratio"
      slot="placeholder"
      :style="`padding-bottom:${Math.round(videoHeight/videoWidth * 10000)/100}%`"
    >
    </div>
  </lazy-media>
</template>


<script>
import LazyMedia from '~/components/lazy-media/LazyMedia'

export default {
  props: {
    videoWidth: Number,
    videoHeight: Number,
    videoProvider: String,
    videoProviderUid: String
  },
  data () {
    return {
      isLoaded: false
    }
  },
  components: { LazyMedia },
  methods: {
    onLoad () {
      this.isLoaded = true
    }
  }
}
</script>
