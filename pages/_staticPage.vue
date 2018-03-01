
<template>
  <article class="static-page">
    <h1>{{title}}</h1>
    <section v-html="htmlBody">
    </section>
    <picture v-for="image in images" v-bind:key="image.id">
      <lazy-image
      v-bind:srcWidth="image.value.width"
      v-bind:srcHeight="image.value.height"
      v-bind:src="`${image.imgixHost}${image.value.path}?w=640&q=65`"
      v-bind:alt="image.value.alt"
      width=100% />
    </picture>
  </article>
</template>

<script>
import loadData from '~/lib/load-data'
import lazyImage from '~/components/lazy-image/LazyImage.vue'
import renderMarkedContent from '~/lib/custom-marked'

export default {
  async asyncData (context) {
    const { title, body, images } = await loadData(context, context.params)

    return { title, body, images }
  },
  computed: {
    htmlBody () {
      return renderMarkedContent(this.body)
    }
  },
  components: {
    lazyImage
  },
  created () {
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
</style>
