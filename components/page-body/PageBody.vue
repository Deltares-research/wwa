<template>
  <div>
    <div class="page-body">
      <page-body-title
        :page-title="title"
        :influences="influences"
        :goals="goals"
        :methodologies="methodologies"
        :keywords="keywords"
        :storyteller="storyteller"
        :theme="theme"
      />
      <div
        v-if="htmlBody"
        class="page-body__body"
        v-html="htmlBody"
      />
    </div>

    <div
      v-if="images && images.length"
      class="page-body__images"
    >
      <figure
        v-for="image in images"
        :key="image.id"
        class="page-body__figure"
      >
        <responsive-image
          class="page-body__lazy-image"
          :src="`${image.url || `${image.imgixHost}${image.value.path}`}?auto=compress&w=640&q=65`"
          :src-width="image.width || image.value && image.value.width"
          :src-height="image.height || image.value && image.value.height"
          :alt="image.alt || image.value && image.value.alt"
          width="100%"
        />
        <figcaption
          v-if="image && image.title || image && image.value && image.value.title"
          class="page-body__asset-caption"
        >
          {{ image.title || image.value && image.value.title }}
        </figcaption>
      </figure>
    </div>

    <div
      v-if="graphs && graphs.length"
      class="page-body__graphs"
    >
      <figure
        v-for="graph in graphs"
        :key="graph.id"
        class="page-body__figure"
      >
        <responsive-image
          class="page-body__lazy-image"
          :src="`${graph.imgixHost}${graph.value.path}?auto=compress&w=640&q=65`"
          :src-width="graph.value.width"
          :src-height="graph.value.height"
          :alt="graph.value.alt"
          width="100%"
        />
        <figcaption
          v-if="image && image.title || image && image.value && image.value.title"
          class="page-body__asset-caption"
        >
          {{ graph.value.title }}
        </figcaption>
      </figure>
    </div>

    <div
      v-if="video"
      class="page-body__video page-body__figure"
    >
      <responsive-video
        class="page-body__lazy-video"
        :video="video"
      />
    </div>

    <div
      v-if="mapboxStyle"
      class="page-body__map page-body__figure"
    >
      <story-map :mapbox-style="mapboxStyle" />
    </div>

    <div
      v-if="links || partner && partner.name"
      class="page-body page-body__footer"
    >
      <ul
        v-if="links"
        class="page-body__links"
      >
        <li
          v-for="(link, index) in links"
          :key="`${link.title}-${index}`"
        >
          <a
            target="_blank"
            :href="link.path"
          >{{ link.title }}</a>
        </li>
      </ul>
      <div class="page-body__footer--partner">
        <p v-if="partner && partner.name">
          Created in partnership with:
          <img
            v-if="partner.logo && partner.logo.imgixHost"
            :src="`${partner.logo.imgixHost}${partner.logo.value.path}?auto=compress&w=scaleMaxToSize(partner.logo, sizeLimit).w&q=65`"
            class="page-body__partner-img"
            :width="scaleMaxToSize(partner.logo, sizeLimit).w"
            :height="scaleMaxToSize(partner.logo, sizeLimit).h"
          >
          {{ partner.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import renderMarkedContent from '~/lib/marked';
import PageBodyTitle from '~/components/page-body-title/PageBodyTitle';
import StoryMap from '~/components/story-map/StoryMap';
import ResponsiveImage from '~/components/responsive-image/ResponsiveImage';
import ResponsiveVideo from '~/components/responsive-video/ResponsiveVideo';

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
    goals: Array,
    methodologies: Array,
    keywords: Array,
    storyteller: Object,
    partner: Object,
    theme: Object,
    sizeLimit: {
      type: Number,
      default: 3 * 16,
    },
  },
  components: { PageBodyTitle, StoryMap, ResponsiveImage, ResponsiveVideo },
  computed: {
    htmlBody () {
      return renderMarkedContent(this.body);
    },
  },
  methods: {
    scaleMaxToSize: function (imgObj, sizeLimit) {
      if (!imgObj.value.width) {
        return { h: Math.round(sizeLimit), w: Math.round(sizeLimit) };
      }
      const ratio = Math.min(sizeLimit / imgObj.value.width, sizeLimit / imgObj.value.height);
      return { h: Math.round(imgObj.value.height * ratio), w: Math.round(imgObj.value.width * ratio) };
    },
  },
};
</script>

<style>
.page-body {
  color: var(--white);
}

.page-body p {
  margin-bottom: 1rem;
  color: var(--white);
}

.page-body p:first-child {
  font-weight: bold;
}

.page-body p:first-child {
  font-weight: bold;
  margin-bottom: 1rem;
}

.page-body p.intro {
  color: var(--blue-secondary);
}

.page-body img {
  max-width: 100%;
}

.page-body__images:not(:last-child),
.page-body__graphs,:not(:last-child)
.page-body__video:not(:last-child),
.page-body__map:not(:last-child) {
  margin-bottom: 1rem;
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

.page-body__asset-caption {
  padding-top: .5rem;
  background-color: var(--white);
  margin: 0 auto;
}

@media only screen and (--sm-viewport) {
  .page-body__asset-caption {
    padding: 0.5rem 2.5rem 0 2.5rem;
  }
}

.page-body__footer {
  color: var(--blue-secondary);
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
</style>
