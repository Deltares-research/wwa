<template>
  <section class="page-body">
      <h1 class="page-body__title">{{ title }}</h1>
      <section v-if="htmlBody" class="page-body__body" v-html="htmlBody"></section>

      <section v-if="images.length" class="page-body__images">
        <figure v-for="image in images" v-bind:key="image.id">
          <lazy-image
            v-bind:src="`${image.imgixHost}${image.value.path}?w=640&q=65`"
            v-bind:srcWidth="image.value.width"
            v-bind:srcHeight="image.value.height"
            v-bind:alt="image.value.alt"
            width=100% />
          <figcaption>{{ image.value.title }}</figcaption>
        </figure>
      </section>

      <section v-if="graphs.length" class="page-body__graphs">
        <figure v-for="graph in graphs" v-bind:key="graph.id">
           <lazy-image
            v-bind:src="`${graph.imgixHost}${graph.value.path}?w=640&q=65`"
            v-bind:srcWidth="graph.value.width"
            v-bind:srcHeight="graph.value.height"
            v-bind:alt="graph.value.alt"
            width=100% />
          <figcaption>{{ graph.value.title }}</figcaption>
        </figure>
      </section>

      <section v-if="video" class="page-body__video fixed-ratio"
        v-bind:style="`padding-bottom:${Math.round(video.height/video.width * 10000)/100}%`">
        <iframe class="page-body__video" allowfullscreen="allowfullscreen"
          v-bind:src="`//www.${video.provider}.com/embed/${video.providerUid}`" width="100%" height="100%">
        </iframe>
      </section>

      <section v-if="mapboxStyle" class="page-body__map">
        <story-map v-bind:mapbox-style="mapboxStyle"></story-map>
      </section>
    </section>
</template>

<script>
import LazyImage from '~/components/lazy-image/LazyImage'
import StoryMap from '~/components/story-map/StoryMap'
import renderMarkedContent from '~/lib/custom-marked'

export default {
  props: {
    body: String,
    graphs: Array,
    images: Array,
    title: String,
    video: Object,
    mapboxStyle: String
  },
  components: { LazyImage, StoryMap },
  computed: {
    htmlBody () {
      return renderMarkedContent(this.body)
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.page-body {
  padding: 2rem;
  background-color: var(--ui--bg--white);
  flex: 0 1 100%;
}

.page-body figure {
  margin: 0;
  position: relative;
}

.page-body figure + figure {
  margin-top: 2rem;
}

.page-body__title {
  margin-top: 0;
}

.page-body__images,
.page-body__graphs,
.page-body__video,
.page-body__map {
  margin-bottom: 2rem;
}
.page-body > :last-child {
  margin-bottom: 0;
}

.page-body figcaption {
  color: var(--ui--text--light);
  width: 100%;
  padding: 5px 0;
}
</style>
