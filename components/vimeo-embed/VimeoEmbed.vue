<template>
  <div>
    <div class="vimeo-embed">
      <iframe
        :src="`https://player.vimeo.com/video/${vimeoId}`"
        frameborder="0"
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
      />
    </div>
    <div
      class="vimeo-embed__description"
      v-if="title.length > 0 || description.length > 0 || url.length > 0"
    >
      <h3
        v-if="title.length > 0"
        class="vimeo-embed__title h1"
      >
        {{ title }}
      </h3>
      <p
        v-if="description.length > 0"
      >
        {{ description }}
      </p>
      <nuxt-link
        v-if="url.length > 0"
        :to="url"
      >
        Read more ...
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    url: String,
    vimeoId: String,
  },
}
</script>

<style>
.vimeo-embed {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: var(--ui--black);
  overflow: hidden;
  z-index: 0;
}

.vimeo-embed iframe,
.vimeo-embed object,
.vimeo-embed embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vimeo-embed__description {
  text-align: left;
  padding: 1rem 1.5rem 1rem 1.5rem;
  background: var(--ui--blue);
}

.vimeo-embed__title {
  margin-bottom: 0.5rem;
}

@media (min-width: 600px) and (max-width: 900px) {
  .vimeo-embed__title {
    height: 3.25rem;
    line-height: 1.625rem;
    overflow: hidden;
  }
}

</style>
