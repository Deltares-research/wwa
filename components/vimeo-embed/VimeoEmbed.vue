<template>
  <div>
    <div class='vimeo-embed'>
      <iframe
        :src='`https://player.vimeo.com/video/${vimeoId}`'
        frameborder='0'
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
      >
      </iframe>
    </div>
    <div
      class="vimeo-embed__play-button"
    >
      <div class="vimeo-embed__description">
        <h3 class="vimeo-embed__title h1">{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    description: String,
    vimeoId: Number,
    cover: String
  },
  data () {
    return {
      vimeoButtonClicked: false
    }
  }
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

.vimeo-embed__hover {
  background: var(--ui--white);
  opacity: 0;
  z-index: 1;
  transition: opacity 200ms ease-in-out;
}

.vimeo-embed:hover .vimeo-embed__hover {
  opacity: 0.2;
}

.vimeo-embed__description {
  text-align: left;
  padding: 1rem 1.5rem 1rem 1.5rem;
  background: var(--ui--blue);
}

.vimeo-embed__title {
  margin-bottom: 0.5rem;
}

.vimeo-embed__icon {
  fill: var(--ui--white);
  position: absolute;
  left: 1.5rem;
  bottom: 1rem;
}
</style>
