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

      <section class="clearfix page-body__footer">
        <ul v-if="links" class="page-body__links">
          <li v-for="link in links">
            <a target="_blank" v-bind:href="link.path">{{ link.title }}</a>
          </li>
        </ul>
        <div class="page-body__footer--partner">
          <p v-if="partner && partner.name">
             Created in partnership with:
             <span class="clearfix page-body__partner">
              <img v-if="partner.logo && partner.logo.imgixHost" v-bind:src="`${partner.logo.imgixHost}${partner.logo.value.path}?w=scaleMaxToSize(partner.logo, sizeLimit).w&q=65`" v-bind:width="scaleMaxToSize(partner.logo, sizeLimit).w" v-bind:height="scaleMaxToSize(partner.logo, sizeLimit).h">
              {{ partner.name }}
            </span>
          </p>
        </div>
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
    links: Array,
    graphs: Array,
    images: Array,
    title: String,
    video: Object,
    mapboxStyle: String,
    partner: Object,
    sizeLimit: {
      type: Number,
      default: 3 * 16
    }
  },
  components: { LazyImage, StoryMap },
  computed: {
    htmlBody () {
      return renderMarkedContent(this.body)
    }
  },
  methods: {
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

.page-body__footer {
  color: var(--ui--text--light);
  width: 100%;
  padding: 5px 0;
}

.page-body__links {
  list-style:none;
  padding:0;
}
.page-body__links li {
  margin-bottom: 1rem;
}

.page-body__footer--partner {
  text-align:center;
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
