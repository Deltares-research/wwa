<template>
  <section class="page-body">
      <h1 class="page-body__title">{{ title }}</h1>
      <section v-if="htmlBody" class="page-body__body" v-html="htmlBody"></section>

      <section v-if="images.length" class="page-body__images">
        <figure v-for="image in images" v-bind:key="image.id">
          <div class="fixed-ratio"
            v-bind:style="`padding-bottom:${Math.round(image.value.height/image.value.width * 10000)/100}%`">
            <img v-bind:src="`${image.imgixHost}${image.value.path}?w=640`" width="100%"/>
          </div>
          <figcaption>{{ image.value.title }}</figcaption>
        </figure>
      </section>

      <section v-if="graphs.length" class="page-body__graphs">
        <figure v-for="graph in graphs" v-bind:key="graph.id">
          <div class="fixed-ratio"
            v-bind:style="`padding-bottom:${Math.round(graph.value.height/graph.value.width * 10000)/100}%`">
            <img v-bind:src="`${graph.imgixHost}${graph.value.path}?w=640`" width="100%"/>
          </div>
          <figcaption>{{ graph.value.title }}</figcaption>
        </figure>
      </section>

      <figure v-if="video" class="page-body__video fixed-ratio"
        v-bind:style="`padding-bottom:${Math.round(video.height/video.width * 10000)/100}%`">
        <iframe class="page-body__video"
          v-bind:src="`//www.${video.provider}.com/embed/${video.providerUid}`" width="100%" height="100%">
        </iframe>
      </figure>
    </section>
</template>

<script>
import marked from 'marked'

const renderer = new marked.Renderer()
renderer.paragraphCount = 0 // Need to keep track of the number of paragraphs
renderer.paragraph = function (content) {
  const i = this.paragraphCount || 0
  this.paragraphCount++
  return `<p ${(!i) ? 'class="intro"' : ''}>${content}</p>`
}

export default {
  props: {
    body: String,
    graphs: Array,
    images: Array,
    title: String,
    video: Object
  },
  computed: {
    htmlBody () {
      return this.customMarked(this.body)
    }
  },
  methods: {
    customMarked (content) {
      let formatted
      if (content) {
        renderer.paragraphCount = 0
        formatted = marked(content, { renderer })
      }
      return formatted
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.page-body {
  padding: 2rem;
  background-color: var(--ui--bg--white);
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
.page-body__video {
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

.fixed-ratio {
  padding: 0;
  position: relative;
  background-color: var(--ui--text--light);
}
.fixed-ratio > * {
  position: absolute;
}
</style>
