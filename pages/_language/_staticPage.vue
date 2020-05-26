<template>
  <article class="static-page">
    <section v-if="video" class="static-page__video fixed-ratio"
      :style="`padding-bottom:${Math.round(video.height/video.width * 10000)/100}%`">
      <iframe class="static-page__video" allowfullscreen="allowfullscreen"
        :src="`//www.${video.provider}.com/embed/${video.providerUid}`" width="100%" height="100%">
      </iframe>
    </section>
    <h1>{{title}}</h1>
    <section v-html="htmlBody">
    </section>
    <figure v-for="image in images" :key="image.id">
      <lazy-image
      :srcWidth="image.width"
      :srcHeight="image.height"
      :src="`${image.responsiveImage.src}?w=640&q=65`"
      :alt="image.alt"
      width=100% />
      <figcaption>{{ image.title }}</figcaption>
    </figure>
  </article>
</template>

<script>
import fetchContent from '~/lib/fetch-content';
import lazyImage from '~/components/lazy-media/LazyMedia'
import marked from '~/lib/custom-marked'

export default {
  layout: 'static-page',
  async asyncData ({ params }) {
    const query = `
      {
        staticPage(locale: ${params.language}, filter: { slug: { eq: "${params.staticPage}" } }) {
          title
          body
          images {
            id
            alt
            width
            height
            responsiveImage {
              src
            }
          }
          video {
            provider
            providerUid
            width
            height
          }
        }
      }
    `;

    return fetchContent(query).then(data => data.staticPage)
  },
  computed: {
    htmlBody () {
      return marked(this.body)
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
  @import '../../components/colors/colors.css';

.static-page {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  max-width: 960px;
  margin: auto;
  padding: 10rem 1rem;
}

.static-page__video {
  margin-bottom: 2rem;
}
</style>
