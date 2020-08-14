<template>
  <header class="narrative-header">
    <chapter-navigation
      :pages="pages"
      :is-event-chapter="false"
      @scrollTo="onScrollTo"
      class="narrative-header__navigation"
    />

    <h1 class="narrative-header__title">
      {{ title }}
    </h1>

    <img
      v-if="cover"
      class="narrative-header__cover"
      :src="`${cover.imgixHost}${cover.value.path}?auto=compress,format&w=700`"
      alt=""
    >
  </header>
</template>

<script>
  import ChapterNavigation from './ChapterNavigation';

  export default {
    components: {
      ChapterNavigation,
    },
    props: {
      title: String,
      cover: Object,
      pages: Array,
    },
    methods: {
      onScrollTo (slug) {
        this.$emit('scrollTo', slug);
      },
    },
  };
</script>

<style>
  .narrative-header {
    z-index: 1;
    position: relative;
    height: 25rem;
  }

  @media (--md-viewport) {
    .narrative-header {
      height: 28rem;
    }
  }

  .narrative-header:before {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 0.7) 84%, var(--black-primary) 100%);
  }

  .narrative-header__navigation {
    z-index: 2;
  }

  .narrative-header__title {
    position: absolute;
    top: 4rem;
    left: 1rem;
    width: calc(100% - 2rem);
    font-style: normal;
    font-weight: 900;
    font-size: 2rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  @media (--md-viewport) {
    .narrative-header__title {
      top: 5rem;
      left: 50%;
      max-width: 45rem;
      transform: translateX(-50%);
      font-size: 3.75rem;
      line-height: 1.1;
      -webkit-line-clamp: 4;
    }
  }

  @media (--lg-viewport) {
    .narrative-header__title {
      width: calc(100% - 4rem);
    }
  }

  .narrative-header__cover {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
