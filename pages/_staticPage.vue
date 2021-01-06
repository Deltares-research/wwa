<template>
  <article class="layout-section static-page">
    <div class="layout-section__container">
      <section
        v-if="video"
        class="static-page__video static-page__fixed-ratio"
        :style="`padding-bottom:${Math.round(video.height/video.width * 10000)/100}%`"
      >
        <iframe
          class="static-page__video"
          allowfullscreen="allowfullscreen"
          :src="`//www.${video.provider}.com/embed/${video.providerUid}`"
          width="100%"
          height="100%"
        />
      </section>
      <h1>{{ title }}</h1>
      <section
        class="static-page__body"
        v-html="body"
      />
      <figure
        v-for="image in images"
        :key="image.id"
      >
        <lazy-image
          :src-width="image.width"
          :src-height="image.height"
          :src="`${image.url}?auto=compress,format&w=640&q=65`"
          :alt="image.alt"
          width="100%"
        />
        <figcaption>{{ image.title }}</figcaption>
      </figure>
    </div>
  </article>
</template>

<script>
import seoHead from '~/lib/seo-head';
import loadData from '~/lib/load-data';
import lazyImage from '~/components/lazy-media/LazyMedia';

export default {
  layout: 'static-page-light',
  async asyncData (context) {
    const { title, seo, body, images, video } = await loadData(context, context.params);

    return { title, seo, body, images, video };
  },
  head() {
    return seoHead(this.seo, this.$route.path);
  },
  components: {
    lazyImage,
  },
  mounted () {
    this.$store.commit('disableInteraction');
  },
};
</script>

<style>
.static-page {
  padding-bottom: 1rem;
}

.static-page__body p:first-child {
  font-weight: bold;
}

.static-page__video {
  margin-bottom: 2rem;
}

.static-page__fixed-ratio {
  padding: 0;
  position: relative;
  color: var(--blue-secondary);
  background-color: var(--black-secondary);
}

.static-page__fixed-ratio > * {
  position: absolute;
}
</style>
