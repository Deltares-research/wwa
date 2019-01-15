<template>
  <div>
    <section class="page-body">
      <page-body-title
        :pageTitle="title"
        :influences="influences"
        :keywords="keywords"
        :storyteller="storyteller"
        :theme="theme" />

      <section v-if="htmlBody" class="page-body__body" v-html="htmlBody"></section>
    </section>
    <section v-if="images.length" class="page-body__images">
      <figure v-for="image in images" :key="image.id" class="page-body__figure">
        <lazy-image
          class="page-body__lazy-image"
          :src="`${image.imgixHost}${image.value.path}?w=640&q=65`"
          :srcWidth="image.value.width"
          :srcHeight="image.value.height"
          :alt="image.value.alt"
          width=100% />
        <figcaption class="page-body__asset-placeholder">{{ image.value.title }}</figcaption>
      </figure>
    </section>

    <section v-if="graphs.length" class="page-body__graphs">
      <figure v-for="graph in graphs" :key="graph.id" class="page-body__figure">
          <lazy-image
          class="page-body__lazy-image"
          :src="`${graph.imgixHost}${graph.value.path}?w=640&q=65`"
          :srcWidth="graph.value.width"
          :srcHeight="graph.value.height"
          :alt="graph.value.alt"
          width=100% />
        <figcaption class="page-body__asset-placeholder">{{ graph.value.title }}</figcaption>
      </figure>
    </section>

    <section v-if="video" class="page-body__video page-body__figure fixed-ratio"
      :style="`padding-bottom:${Math.round(video.height/video.width * 10000)/100}%`">
      <iframe v-if="video.provider === 'youtube'" allowfullscreen="allowfullscreen" frameborder="0"
        :src="`//www.${video.provider}.com/embed/${video.providerUid}`" width="100%" height="100%">
      </iframe>
      <iframe v-else-if="video.provider === 'vimeo'" allowfullscreen="allowfullscreen" frameborder="0"
        :src="`https://player.vimeo.com/video/${video.providerUid}?title=0&author=0&portrait=0&playbar=0&byline=0`" width="100%" height="100%">
      </iframe>
    </section>

    <section v-if="mapboxStyle" class="page-body__map">
      <story-map :mapbox-style="mapboxStyle"></story-map>
      <div class="page-body__asset-placeholder">

      </div>
    </section>
    <section class="page-body">
      <section class="page-body__footer">
        <ul v-if="links" class="page-body__links">
          <li v-for="link in links" :key="link.title">
            <a target="_blank" :href="link.path">{{ link.title }}</a>
          </li>
        </ul>
        <div class="page-body__footer--partner">
          <p v-if="partner && partner.name">
            Created in partnership with:
            <img v-if="partner.logo && partner.logo.imgixHost" :src="`${partner.logo.imgixHost}${partner.logo.value.path}?w=scaleMaxToSize(partner.logo, sizeLimit).w&q=65`" class="page-body__partner-img" :width="scaleMaxToSize(partner.logo, sizeLimit).w" :height="scaleMaxToSize(partner.logo, sizeLimit).h">
            {{ partner.name }}
          </p>
        </div>
      </section>

    </section>
  </div>
</template>

<script>
import LazyImage from '~/components/lazy-image/LazyImage'
import PageBodyTitle from '~/components/page-body-title/PageBodyTitle'
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
    influences: Array,
    keywords: Array,
    storyteller: Object,
    partner: Object,
    theme: Object,
    sizeLimit: {
      type: Number,
      default: 3 * 16
    }
  },
  components: { LazyImage, PageBodyTitle, StoryMap },
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
  padding: 1.5rem;
  background-color: var(--ui--bg--white);
}

@media only screen and (min-width: 600px) {
  .page-body {
    padding: 1rem 2.5rem;
  }
}

.page-body p.intro {
  font-size: 1rem;
  color: #3f6a7e;
}

.page-body__figure {
  margin: 0;
  position: relative;
}

@media only screen and (min-width: 1200px) {
  .page-body__figure {
    width: calc(100% + 3rem);
    margin-left: -1.5rem;
  }
}

.page-body__lazy-image {
  vertical-align: bottom;
}

.page-body__asset-placeholder {
  padding: 0.5rem 1.5rem 1rem 1.5rem;
  background-color: var(--ui--bg--white);
  max-width: 35rem;
  margin: 0 auto;
}

@media only screen and (min-width: 600px) {
  .page-body__asset-placeholder {
    padding: 0.5rem 2.5rem 1rem 2.5rem;
  }
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
  text-align: center;
}

.page-body__partner {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  font-style: italic;
}

.page-body__partner-img {
  margin: 0 4px;
  vertical-align: middle;
  display: inline-block;
}

.fixed-ratio {
  padding: 0;
  position: relative;
  background-color: var(--ui--text--light);
}

.fixed-ratio > * {
  position: absolute;
}

/*
* style rules for a minimal print layout
*/

@media print {
  .page-body__links a:after,
  .page-body p a:after {
    content: " (" attr(href) ")";
    font-size: 80%;
  }
  .page-body__video {
    display: none;
  }
  .page-body__figure {
    page-break-inside: avoid;
    max-width: 100mm;
  }
  .page-body__links {
    page-break-inside: avoid;
  }
  .page-body__images,
  .page-body__graphs {
    padding: 0 1.5rem;
  }
  .page-body__asset-placeholder {
    max-width: none;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
