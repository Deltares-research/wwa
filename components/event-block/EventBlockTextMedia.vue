<template functional>
  <div class="event-block-text-media">
    <img
      v-if="props.showWaveMarker"
      src="/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="event-block-text-media__icon"
    >
    <h3
      class="event-block-text-media__title"
      :class="{
        'event-block-text-media__title--orange': props.titleColor === 'orange',
        'event-block-text-media__title--blue': props.titleColor === 'blue',
      }"
    >
      {{ props.title }}
    </h3>
    <a
      v-if="props.internalButtonLabel"
      :href="`#${props.internalButtonSlug}`"
      class="event-block-text-media__button"
    >
      {{ props.internalButtonLabel }}
    </a>
    <picture
      v-if="props.image"
      class="event-block-text-media__image-wrapper"
      :class="{ 'event-block-text-media__image-wrapper--mirrored': props.mirrorLayout }"
    >
      <source
        :srcset="props.image.portrait.srcSet"
        :sizes="props.image.portrait.sizes"
        media="(min-width: 48rem)"
      >
      <source
        :srcset="props.image.landscape.srcSet"
        :sizes="props.image.landscape.sizes"
        media="(max-width: 48rem)"
      >
      <img
        class="event-block-text-media__image"
        :src="props.image.portrait.src"
        :alt="props.image.alt"
      >
    </picture>
    <div
      class="event-block-text-media__copy"
      v-html="props.body"
    />
    <p
      v-if="props.callToActionLabel && props.callToActionUrl"
      class="event-block-text-media__cta"
    >
      <a :href="props.callToActionUrl">
        {{ props.callToActionLabel }}
      </a>
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      showWaveMarker: Boolean,
      title: String,
      titleColor: String,
      internalButtonLabel: String,
      internalButtonSlug: String,
      image: Object,
      body: String,
      callToActionLabel: String,
      callToActionUrl: String,
      mirrorLayout: Boolean,
    },
  };
</script>

<style>
  .event-block-text-media {
    margin-bottom: 2rem;
  }

  .event-block-text-media__icon {
    margin-bottom: .25rem;
  }

  .event-block-text-media__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  .event-block-text-media__title--orange {
    color: var(--orange);
  }

  .event-block-text-media__title--blue {
    color: var(--blue-tertiary);
  }

  .event-block-text-media__button {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 2.5rem;
    font-weight: bold;
    color: var(--black-primary);
    text-decoration: none;
    background: var(--blue-tertiary);
    border-radius: 2px;
  }

  .event-block-text-media__button:hover {
    color: var(--white);
    background-color: var(--blue-secondary);
  }

  .event-block-text-media__image {
    margin-bottom: 1rem;
  }

  .event-block-text-media__copy {
    max-width: 30rem;
  }

  .event-block-text-media__copy p {
    line-height: 1.8;
  }

  .event-block-text-media__copy p:not(:last-child) {
    margin-bottom: 3.8rem;
  }

  .event-block-text-media__copy a,
  .event-block-text-media__cta a {
    line-height: 1.9;
    font-weight: bold;
    color: var(--blue-tertiary);
    text-decoration: none;
  }

  .event-block-text-media__cta a:hover,
  .event-block-text-media__cta a:focus,
  .event-block-text-media__copy a:hover,
  .event-block-text-media__copy a:focus {
    text-decoration: underline;
  }

  @media (--md-viewport) {
    .event-block-text-media {
      display: inline-grid;
      grid-column-gap: 3rem;
      grid-template-columns: 1fr 1fr;
      justify-items: start;
      margin-bottom: 0;
    }

    .event-block-text-media__icon {
      margin-bottom: 1rem;
    }

    .event-block-text-media__title {
      font-size: 3.75rem;
      line-height: 1.1;
    }

    .event-block-text-media__image {
      margin-bottom: 0;
    }

    .event-block-text-media__image-wrapper {
      grid-column-start: 2;
      grid-row-start: 1;
      grid-row-end: 99;
    }

    .event-block-text-media__image-wrapper--mirrored {
      grid-column-start: 1;
    }
  }
</style>
