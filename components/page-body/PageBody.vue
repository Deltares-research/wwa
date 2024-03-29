<template>
  <div>
    <div class="page-body">
      <page-body-title
        :page-title="title"
        :influences="influences"
        :goals="goals"
        :methodologies="methodologies"
        :storyteller="storyteller"
        :files="files"
        :theme="theme"
      />
      <div
        v-if="body"
        class="page-body__body"
        v-html="body"
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
        :class="(image.width / image.height < .8) ? 'page-body__figure--is-portrait' : null"
      >
        <responsive-image
          class="page-body__lazy-image"
          :src="`${image.url}?auto=compress,format&w=640&q=65`"
          :src-width="image.width"
          :src-height="image.height"
          :alt="image.alt"
          width="100%"
        />
        <figcaption
          v-if="image.title"
          class="page-body__asset-caption"
        >
          {{ image.title }}
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
        :class="(graph.value.width / graph.value.height < .8) ? 'page-body__figure--is-portrait' : null"
      >
        <responsive-image
          class="page-body__lazy-image"
          :src="`${graph.imgixHost}${graph.value.path}?auto=compress,format&w=640&q=65`"
          :src-width="graph.value.width"
          :src-height="graph.value.height"
          :alt="graph.value.alt"
          width="100%"
        />
        <figcaption
          v-if="graph && graph.title || graph && graph.value && graph.value.title"
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
      v-if="videoTranscript"
      class="page-body__video-transcript"
    >
      <button
        :aria-expanded="showVideoTranscript ? 'true' : 'false'"
        class="page-body__video-transcript__button"
        :class="{ 'page-body__video-transcript__button--open' : showVideoTranscript }"
        @click="toggleVideoTranscript"
      >
        <template v-if="showVideoTranscript">
          Hide video transcript
        </template>
        <template v-else>
          Show video transcript
        </template>
      </button>

      <div
        :hidden="!showVideoTranscript"
        class="page-body__video-transcript__content"
        v-html="videoTranscript"
      />
    </div>

    <div
      v-if="mapboxStyle"
      class="page-body__map page-body__figure"
    >
      <story-map :mapbox-style="mapboxStyle" />
    </div>

    <div class="page-body__keywords">
      <div class="page-body__keywords-title">
        Keywords:
      </div>
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
        class="page-body__link-item"
      >
        <a
          target="_blank"
          :href="link.path"
        >{{ link.title }}</a>
      </li>
    </ul>

    <p
      v-if="partner && partner.name"
      class="page-body__partners"
    >
      Created in partnership with:
      <img
        v-if="partner.logo && partner.logo.imgixHost"
        :src="`${partner.logo.imgixHost}${partner.logo.value.path}?auto=compress,format&w=scaleMaxToSize(partner.logo, sizeLimit).w&q=65`"
        class="page-body__partners-image"
        :width="scaleMaxToSize(partner.logo, sizeLimit).w"
        :height="scaleMaxToSize(partner.logo, sizeLimit).h"
        alt=""
      >
      {{ partner.name }}
    </p>
  </div>
</template>

<script>
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
    videoTranscript: String,
    mapboxStyle: String,
    influences: Array,
    files: Array,
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
  data() {
    return {
      showVideoTranscript: false,
    };
  },
  methods: {
    scaleMaxToSize (imgObj, sizeLimit) {
      if (!imgObj.value.width) {
        return { h: Math.round(sizeLimit), w: Math.round(sizeLimit) };
      }
      const ratio = Math.min(sizeLimit / imgObj.value.width, sizeLimit / imgObj.value.height);
      return { h: Math.round(imgObj.value.height * ratio), w: Math.round(imgObj.value.width * ratio) };
    },
    toggleVideoTranscript () {
      this.showVideoTranscript = !this.showVideoTranscript;
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

.page-body__body ul,
.page-body__body ol {
  margin-bottom: 1rem;
  padding-left: 1.1rem;
  line-height: var(--line-height);
}

.page-body__body ul li,
.page-body__body ol li {
  margin-bottom: .5rem;
  padding-left: .5rem;
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
.page-body__graphs:not(:last-child),
.page-body__video:not(:last-child),
.page-body__video-transcript:not(:last-child),
.page-body__map:not(:last-child),
.page-body__figure:not(:last-child),
.page-body__keywords:not(:last-child) {
  margin-bottom: 1rem;
}

@media (--md-viewport) {
  .page-body__images:not(:last-child),
  .page-body__graphs:not(:last-child),
  .page-body__video:not(:last-child),
  .page-body__video-transcript:not(:last-child),
  .page-body__map:not(:last-child),
  .page-body__figure:not(:last-child),
  .page-body__keywords:not(:last-child) {
    margin-bottom: 2rem;
  }
}

.page-body__video-transcript {
  margin-top: -1rem;
}

@media (--md-viewport) {
  .page-body__video-transcript {
    margin-top: -2rem;
  }
}

.page-body__video-transcript__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5rem;
  padding: .5rem;
  margin-left: -.5rem;
  appearance: none;
  background: none;
  border: none;
  font-size: inherit;
  color: var(--white);
  cursor: pointer;
}


.page-body__video-transcript__button:after {
  content: '';
  display: block;
  margin-left: .5rem;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url('~assets/arrow-down.svg');
  background-size: 1rem;
  background-repeat: no-repeat;
  background-position: center;
  transition: transform .3s ease
}

.page-body__video-transcript__button--open:after {
  transform: rotate(180deg);
}

.page-body__video-transcript__content {
  margin-bottom: .5rem;
  padding: .8rem 1rem;
  background: var(--blue-primary);
}

.page-body__video-transcript__content p:not(:last-child) {
  margin-bottom: 1rem;
}

.page-body__figure {
  margin: 0;
  position: relative;
}

.page-body__figure--is-portrait {
  width: 50%;
  margin: 0 auto;
}

@media (min-width: 1200px) {
  .page-body__figure {
    width: 100%;
  }

  .page-body__figure--is-portrait {
    width: 50%;
  }
}

.page-body__lazy-image {
  vertical-align: bottom;
}

.page-body__asset-caption {
  padding-top: .5rem;
  margin: 0 auto;
  text-align: center;
}

@media (--sm-viewport) {
  .page-body__asset-caption {
    padding: 0.5rem 2.5rem 0 2.5rem;
  }
}

.page-body__keywords {
  display: flex;
}

.page-body__keywords-title {
  display: flex;
  margin-right: 1rem;
  font-style: italic;
  color: var(--white);
}

.page-body__keywords-list {
  display: flex;
  flex-wrap: wrap;
}

.page-body__keyword {
  list-style-type: none;
  margin-bottom: .25rem;
  margin-right: .75rem;
}

.page-body__keyword a {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: var(--blue-tertiary);
  text-decoration: none;
}

.page-body__links {
  margin-bottom: 1rem;
  list-style: none;
  padding: 0;
}

@media (--md-viewport) {
  .page-body__links {
    margin-bottom: 2rem;
  }
}

.page-body__link-item {
  margin-bottom: .5rem;
}

p.page-body__partners {
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
}

.page-body__partners-image {
  margin: 0 4px;
  vertical-align: middle;
  display: inline-block;
}
</style>
