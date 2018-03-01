
<template>
  <article class="static-page">
    <h1>{{title}}</h1>
    <picture v-for="image in images" v-bind:key="image.id">
      <lazy-image v-bind:src="`${image.imgixHost}${image.value.path}?w=640&q=65`" v-bind:alt="image.value.alt"/>
    </picture>
    <section v-html="htmlBody">
    </section>
  </article>
</template>

<script>
import loadData from '~/lib/load-data'
import lazyImage from '~/components/lazy-image/LazyImage.vue'
import { renderMarkedContent } from '~/lib/custom-marked'

export default {
  async asyncData (context) {
    const { title, body, images } = await loadData(context, context.params)
    context.store.commit('globe/disableInteraction')

    return { title, body, images }
  },
  computed: {
    htmlBody () {
      return renderMarkedContent(this.body)
    }
  },
  components: {
    lazyImage
  }
}
</script>
<style>
  @import '../components/colors/colors.css';

  .static-page {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 4rem;
    background-color: var(--ui--white);
    box-sizing: border-box;
  }
</style>
