<template>
  <header class="narrative-header-event">
    <div class="narrative-header-event__header">
      <h1 class="narrative-header-event__header-title">
        {{ chapter.title }}
      </h1>
      <img
        v-if="chapter.cover"
        :src="chapter.cover.responsiveImage.src"
        :srcset="chapter.cover.responsiveImage.srcSet"
        :sizes="chapter.cover.responsiveImage.sizes"
        alt=""
        class="narrative-header-event__header-image"
      >
    </div>

    <chapter-navigation
      :pages="chapter.pages"
      :with-background="true"
    />
  </header>
</template>

<script>
  import ChapterNavigation from './ChapterNavigation';

  export default {
    components: {
      ChapterNavigation,
    },
    props: {
      chapter: Object,
    },
    data () {
      return {
        showNavigation: false,
      };
    },
    methods: {
      toggleNavigation () {
        this.showNavigation = !this.showNavigation;
      },
      navigate (slug) {
        this.$emit('scrollTo', slug);
        this.showNavigation = false;
      },
    },
  };
</script>

<style>
  :root {
    --narrative-header-event-transition-speed: 300ms;
    --narrative-header-event-transition-timing-hide: cubic-bezier(0.83, 0, 0.73, 1);
    --narrative-header-event-transition-timing-reveal: cubic-bezier(0.17, 0, 0.27, 1);
  }

  .narrative-header-event {
    position: relative;
    margin: 0 -1rem 2rem -1rem;
  }

  @media (--sm-viewport) {
    .narrative-header-event {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .narrative-header-event__header {
    position: relative;
    z-index: 1;
    border-bottom: 1rem solid var(--black);
    width: 100%;
    height: 180px;
    background-image: url(/assets/event-wave.svg), linear-gradient(137deg, #E9E6CF 14.18%, var(--blue-tertiary) 95.78%);
    background-size: 105% auto;
    background-repeat: no-repeat;
    background-position: bottom 0% center;
  }

  @media (--md-viewport) {
    .narrative-header-event__header {
      height: 360px;
    }
  }

  .narrative-header-event__header:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  }

  .narrative-header-event__header-title {
    position: absolute;
    z-index: 1;
    left: 1rem;
    bottom: 1.5rem;
  }

  @media (--md-viewport) {
    .narrative-header-event__header-title {
      left: 2rem;
      bottom: 2.5rem;
      font-size: 3.75rem;
      font-weight: 900;
      line-height: 1.1;
    }
  }

  .narrative-header-event__header-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
