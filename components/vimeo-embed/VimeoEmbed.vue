<template>
  <div class='vimeo-embed'>
    <button
      v-if="vimeoButtonClicked != true"
      class="vimeo-embed__play-button"
      @click="clickVimeoButton(id)"
    >
      <div class="vimeo-embed__description">
        <h3 class="vimeo-embed__title h1">{{ title }}</h3>
        <p>{{ description }}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="vimeo-embed__icon"
        >
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
      </div>
      <picture
        v-if="cover.length > 0"
        class="vimeo-embed__cover"
      >
        <source
          :srcset="`${coverPath(cover)}?w=280&h=158&fit=crop 280w,
                    ${coverPath(cover)}?w=360&h=202&fit=crop 360w,
                    ${coverPath(cover)}?w=460&h=259&fit=crop 460w,
                    ${coverPath(cover)}?w=559&h=314&fit=crop 559w,
                    ${coverPath(cover)}?w=559&h=314&fit=crop&dpr=2 1118w,
                    ${coverPath(cover)}?w=559&h=314&fit=crop&dpr=3 1677w`"
          sizes="100vw"
        >
        <img
          :src="`${coverPath(cover)}?w=157&h=232&fit=crop`"
          role="presentation"
        >
      </picture>
      <div class="vimeo-embed__hover"></div>
    </button>
    <iframe
      :src='`https://player.vimeo.com/video/${vimeoId}`'
      frameborder='0'
      webkitAllowFullScreen
      mozallowfullscreen
      allowFullScreen
    >
    </iframe>
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
  },
  methods: {
    clickVimeoButton (id) {
      console.log('vimeo button clicked ' + id)
      this.vimeoButtonClicked = true
    },
    coverPath (cover) {
      return `https://www.datocms-assets.com${cover}`
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
}

.vimeo-embed iframe,
.vimeo-embed object,
.vimeo-embed embed,
.vimeo-embed__play-button,
.vimeo-embed__hover {
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

.vimeo-embed__play-button {
  position: absolute;
  display: block;
  border: none;
  background: none;
  padding: 0;
  color: var(--ui--white);
  z-index: 2;
  cursor: pointer;
}

.vimeo-embed__cover {
  position: absolute;
  top: 0;
  left: 0;
}

.vimeo-embed__description {
  height: calc(100% -4rem);
  width: 200px;
  max-width: 100%;
  float: right;
  text-align: left;
  padding: 1rem 1.5rem 3rem 1.5rem;
  background: var(--ui--black--trans);
  z-index: 3;
  position: relative;
}

.vimeo-embed__title {
  max-height: 58px;
  overflow: hidden;
}

.vimeo-embed__icon {
  fill: var(--ui--white);
  position: absolute;
  left: 1.5rem;
  bottom: 1rem;
}
</style>
