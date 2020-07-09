<template>
  <div>
    <section class="page-body">
      <page-body-title
        :page-title="title"
        :influences="influences"
        :goals="goals"
        :methodologies="methodologies"
        :storyteller="storyteller"
        :theme="theme"
      />
      <section
        v-if="htmlBody"
        class="page-body__body"
        v-html="htmlBody"
      />
    </section>

    <section
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
        <figcaption class="page-body__asset-placeholder">
          {{ image.title || image.value && image.value.title }}
        </figcaption>
      </figure>
    </section>

    <section
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
        <figcaption class="page-body__asset-placeholder">
          {{ graph.value.title }}
        </figcaption>
      </figure>
    </section>

    <section
      v-if="video"
      class="page-body__video page-body__figure"
    >
      <responsive-video
        class="page-body__lazy-video"
        :video="video"
      />
      <div class="page-body__asset-placeholder" />
    </section>

    <section
      v-if="mapboxStyle"
      class="page-body__map page-body__figure"
    >
      <story-map :mapbox-style="mapboxStyle" />
      <div class="page-body__asset-placeholder" />
    </section>

    <section class="page-body">
      <section class="page-body__footer">
        <div class="page-body__keywords">
          <h5 class="page-body__keywords-title">
            Keywords:
          </h5>
          <ul class="page-body__keywords-list">
            <li
              v-for="keyword in keywords"
              :key="`keyword-${keyword.slug}`"
              class="page-body__keyword"
            >
              <nuxt-link :to="keyword.path">
                {{ keyword.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
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
      </section>
    </section>
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
  components: {
    PageBodyTitle,
    StoryMap,
    ResponsiveImage,
    ResponsiveVideo,
  },
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
  padding: 1.5rem;
  color: var(--white);
}

.page-body p {
  margin-bottom: 1rem;
}

.page-body p:first-child {
  font-weight: bold;
}

@media only screen and (--sm-viewport) {
  .page-body {
    padding: 1rem 2.5rem;
  }
}

.page-body p.intro {
  color: var(--blue-secondary);
}

.page-body img {
  max-width: 100%;
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
  background-color: var(--white);
  margin: 0 auto;
}

@media only screen and (--sm-viewport) {
  .page-body__asset-placeholder {
    padding: 0.5rem 2.5rem 1rem 2.5rem;
  }
}

.page-body__footer {
  color: var(--blue-secondary);
  width: 100%;
  padding: 5px 0;
}

.page-body__keywords {
  display: flex;
}

.page-body__keywords-title {
  display: flex;
  margin-right: 1rem;
  font-weight: normal;
  color: var(--white);
}

.page-body__keywords-list {
  display: flex;
  flex-wrap: wrap;
}

.page-body__keyword {
  list-style-type: none;
  margin-bottom: 0.5rem;
  margin-right: 1rem;
}

.page-body__keyword a {
  display: block;
  font-size: .825rem;
  font-weight: bold;
  color: var(--blue-tertiary);
  text-decoration: none;
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
