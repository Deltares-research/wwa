<template functional>
  <div
    class="event-block-text-media"
    :class="{ 'event-block-text-media--mirrored': props.mirrorLayout }"
  >
    <div class="event-block-text-media__content">
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
        v-if="props.programButtonLabel"
        href="#"
        class="event-block-text-media__button"
      >
        {{ props.programButtonLabel }}
      </a>
      <picture
        v-if="props.image"
        class="event-block-text-media__image-wrapper event-block-text-media__image-wrapper--mobile"
      >
        <source
          :srcset="props.image.landscape.srcSet"
          :sizes="props.image.landscape.sizes"
        >
        <img
          class="event-block-text-media__image"
          :src="props.image.portrait.src"
          :width="props.image.portrait.width"
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
    <picture
      v-if="props.image"
      class="event-block-text-media__image-wrapper event-block-text-media__image-wrapper--desktop"
    >
      <source
        :srcset="props.image.portrait.srcSet"
        :sizes="props.image.portrait.sizes"
      >
      <img
        class="event-block-text-media__image"
        :src="props.image.portrait.src"
        :width="props.image.portrait.width"
        :alt="props.image.alt"
      >
    </picture>
  </div>
</template>

<script>
  export default {
    props: {
      showWaveMarker: Boolean,
      title: String,
      titleColor: String,
      programButtonLabel: String,
      image: {
        portrait: Object,
        landscape: Object,
      },
      body: String,
      callToActionLabel: String,
      callToActionUrl: String,
      mirrorLayout: Boolean,
    },
  };
</script>

<style>
  .event-block-text-media__content {
    margin-bottom: 2rem;
  }

  .event-block-text-media__icon {
    margin-bottom: .25rem;
  }

  .event-block-text-media__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  .event-block-text-media__title--orange {
    color: var(--orange);
  }

  .event-block-text-media__title--blue {
    color: var(--tertiary-blue);
  }

  .event-block-text-media__button {
    display: inline-block;
    margin-top: -.5rem;
    margin-bottom: 2.5rem;
    padding: .5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: var(--black);
    text-decoration: none;
    background: var(--tertiary-blue);
    border-radius: 2px;
  }

  .event-block-text-media__button:hover {
    color: var(--black);
  }

  .event-block-text-media__image {
    margin-bottom: 1rem;
    width: 100%;
  }

  .event-block-text-media__copy {
    max-width: 30rem;
  }

  .event-block-text-media__copy p {
    font-size: 1rem;
    line-height: 1.6;
  }

  .event-block-text-media__copy p:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .event-block-text-media__copy a,
  .event-block-text-media__cta a {
    font-size: 1rem;
    line-height: 1.9;
    font-weight: bold;
    color: var(--tertiary-blue);
    text-decoration: none;
  }

  .event-block-text-media__cta a:hover,
  .event-block-text-media__cta a:focus,
  .event-block-text-media__copy a:hover,
  .event-block-text-media__copy a:focus {
    text-decoration: underline;
  }

  .event-block-text-media__image-wrapper--desktop {
    display: none;
  }

  @media (--sm-viewport) {
    .event-block-text-media__image {
      max-width: 600px;
    }
  }

  @media (--md-viewport) {
    .event-block-text-media__content {
      margin-bottom: 0;
    }

    .event-block-text-media {
      display: flex;
    }

    .event-block-text-media--mirrored {
      flex-direction: row-reverse;
    }

    .event-block-text-media__icon {
      margin-bottom: 1rem;
    }

    .event-block-text-media__title {
      font-size: 3.75rem;
      line-height: 1.1;
    }

    .event-block-text-media__content {
      flex: 1 1 50%;
      margin-right: 3rem;
    }

    .event-block-text-media--mirrored .event-block-text-media__content {
      margin-left: 3rem;
      margin-right: 0;
    }

    .event-block-text-media__image-wrapper {
      flex: 1 1 50%;
    }

    .event-block-text-media__image-wrapper--desktop {
      display: block;
    }

    .event-block-text-media__image-wrapper--mobile {
      display: none;
    }
  }
</style>
