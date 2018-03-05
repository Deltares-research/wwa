<template>
  <section class="page-body">
      <h1 class="page-body__title">{{ title }}</h1>
      <section v-if="htmlBody" class="page-body__body" v-html="htmlBody"></section>

      <section v-if="images.length" class="page-body__images">
        <figure v-for="image in images" v-bind:key="image.id">
          <div class="fixed-ratio"
            v-bind:style="`padding-bottom:${Math.round(image.value.height/image.value.width * 10000)/100}%`">
            <img v-bind:src="`${image.imgixHost}${image.value.path}?w=640&q=65`" width="100%"/>
          </div>
          <figcaption>{{ image.value.title }}</figcaption>
        </figure>
      </section>

      <section v-if="graphs.length" class="page-body__graphs">
        <figure v-for="graph in graphs" v-bind:key="graph.id">
          <div class="fixed-ratio"
            v-bind:style="`padding-bottom:${Math.round(graph.value.height/graph.value.width * 10000)/100}%`">
            <img v-bind:src="`${graph.imgixHost}${graph.value.path}?w=640&q=65`" width="100%"/>
          </div>
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

      <section class="clearfix page-body__footer">
        <ul class="pag-body__links">
          <li v-for="link in links" v-bind:key="link.slug">
            <nuxt-link v-bind:to="link.path">{{ link.title }}</nuxt-link>
          </li>
        </ul>

        <p v-if="partner && partner.name" >
           Created in partnership with:
           <span class="clearfix page-body__partner">
            <img v-if="partner && partner.logo.imgixHost" v-bind:src="`${partner.logo.imgixHost}${partner.logo.value.path}?w=scaleMaxToSize(partner.logo, sizeLimit).w&q=65`" v-bind:width="scaleMaxToSize(partner.logo, sizeLimit).w" v-bind:height="scaleMaxToSize(partner.logo, sizeLimit).h">
            {{ partner.name }}
          </span>
        </p>
      </section>

    </section>
</template>

<script>
import marked from 'marked'
import StoryMap from '~/components/story-map/StoryMap'

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
    video: Object,
    mapboxStyle: String,
    partner: Object,
    sizeLimit: {
      type: Number,
      default: 4 * 16
    }
  },
  components: { StoryMap },
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
    },
    scaleMaxToSize: function (imgObj, sizeLimit) {
      if (!imgObj.value.width) {
        return { h: Math.round(sizeLimit), w: Math.round(sizeLimit) }
      }
      const ratio = Math.min(sizeLimit / imgObj.value.width, sizeLimit / imgObj.value.height)
      return { h: Math.round(imgObj.value.height * ratio), w: Math.round(imgObj.value.width * ratio) }
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

.page-body__footer {
  color: var(--ui--text--light);
  width: 100%;
  padding: 5px 0;
}

.page-body__partner {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  font-style: italic;
}

.page-body__partner img {
  margin: 0 4px;
  vertical-align: middle;
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
