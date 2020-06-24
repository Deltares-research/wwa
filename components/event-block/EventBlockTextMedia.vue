<template functional>
  <div>
    <img
      v-if="props.showWaveMarker"
      src="/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
    >
    <h3 class="event-block-text-media__title">
      {{ props.title }}
    </h3>
    <picture v-if="props.image">
      <source
        :srcset="props.image.portrait.srcSet"
        :sizes="props.image.portrait.sizes"
        media="(min-width: 800px)"
      >
      <source
        :srcset="props.image.landscape.srcSet"
        :sizes="props.image.landscape.sizes"
        media="(max-width: 800px)"
      >
      <img
        class="event-section__image"
        :src="props.image.portrait.src"
        :width="props.image.portrait.width"
        :alt="props.image.alt"
      >
    </picture>
    <div
      class="event-block-text-media__copy"
      v-html="props.body"
    />
  </div>
</template>

<script>
  export default {
    props: {
      showWaveMarker: Boolean,
      title: String,
      image: {
        portrait: Object,
        landscape: Object,
      },
      body: String,
    },
  };
</script>

<style>
  .event-block-text-media__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  @media (--sm-viewport) {
    .event-block-text-media__title {
      font-size: 3.75rem;
      font-weight: 900;
    }

    .event-block-text-media__image {
      margin-bottom: 1rem;
    }

    .event-block-text-media__copy {
    }

    .event-block-text-media__copy p {
    }
  }
</style>
