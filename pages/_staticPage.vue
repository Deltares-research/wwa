
<template>
  <article class="static-page">
    <section v-if="video" class="static-page__video fixed-ratio"
      v-bind:style="`padding-bottom:${Math.round(video.height/video.width * 10000)/100}%`">
      <iframe class="static-page__video" allowfullscreen="allowfullscreen"
        v-bind:src="`//www.${video.provider}.com/embed/${video.providerUid}`" width="100%" height="100%">
      </iframe>
    </section>
    <h1>{{title}}</h1>
    <section v-html="htmlBody">
    </section>
    <figure v-for="image in images" v-bind:key="image.id">
      <lazy-image
      v-bind:srcWidth="image.value.width"
      v-bind:srcHeight="image.value.height"
      v-bind:src="`${image.imgixHost}${image.value.path}?w=640&q=65`"
      v-bind:alt="image.value.alt"
      width=100% />
      <figcaption>{{ image.value.title }}</figcaption>
    </figure>
  </article>
</template>

<script>
import loadData from '~/lib/load-data'
import lazyImage from '~/components/lazy-image/LazyImage'
import renderMarkedContent from '~/lib/custom-marked'

export default {
  async asyncData (context) {
    const { title, body, images, video } = await loadData(context, context.params)
    return { title, body, images, video }
  },
  computed: {
    htmlBody () {
      return renderMarkedContent(this.body)
    }
  },
  components: {
    lazyImage
  },
  mounted () {
    this.$store.commit('disableInteraction')
  }
}
</script>
<style>
  @import '../components/colors/colors.css';

  .static-page {
    position: absolute;
    top: 75vh;
    width: 100%;
    padding: 4rem;
    background-color: var(--ui--white);
    box-sizing: border-box;
  }

  .static-page__video {
    margin-bottom: 2rem;
  }
</style>
