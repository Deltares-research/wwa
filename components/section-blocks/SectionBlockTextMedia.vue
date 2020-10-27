<template functional>
  <div class="section-block-text-media">
    <img
      v-if="props.showWaveMarker"
      src="~/assets/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="animator__slide-up section-block-text-media__icon"
    >
    <h3
      class="animator__slide-up section-block-text-media__title"
      :class="{
        'section-block-text-media__title--orange': props.titleColor === 'orange',
        'section-block-text-media__title--blue': props.titleColor === 'blue',
      }"
      animator-stagger
    >
      {{ props.title }}
    </h3>
    <a
      v-if="props.internalButtonLabel"
      :href="`#${props.internalButtonSlug}`"
      class="animator__slide-up section-block-text-media__button"
      animator-stagger
    >
      {{ props.internalButtonLabel }}
    </a>
    <div
      class="animator__slide-up section-block-text-media__image-wrapper"
      :class="{ 'section-block-text-media__image-wrapper--mirrored': props.mirrorLayout }"
      animator-stagger
    >
      <picture
        v-if="props.image"
        class="animator__scale-container "
      >
        <source
          :srcset="`${props.image.url}?auto=compress&w=550&h=660&fit=crop&crop=entropy`"
          media="(min-width: 48rem)"
        >
        <source
          :srcset="`${props.image.url}?auto=compress&w=600&h=270&fit=crop&crop=entropy`"
          media="(max-width: 48rem)"
        >
        <img
          class="animator__scale-up animator__scale-image section-block-text-media__image"
          :src="props.image.url"
          :alt="props.image.alt"
        >
      </picture>
    </div>
    <div
      class="animator__slide-up section-block-text-media__copy"
      v-html="props.body"
      animator-stagger
    />
    <p
      v-if="props.callToActionLabel && props.callToActionUrl"
      class="animator__slide-up section-block-text-media__cta"
      animator-stagger
    >
      <a
        :href="props.callToActionUrl"
        target="_blank"
      >
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
  .section-block-text-media {
    margin-bottom: 2rem;
  }

  .section-block-text-media__icon {
    margin-bottom: .25rem;
  }

  .section-block-text-media__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  .section-block-text-media__title--orange {
    color: var(--orange);
  }

  .section-block-text-media__title--blue {
    color: var(--blue-tertiary);
  }

  .section-block-text-media__button {
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

  .section-block-text-media__button:hover {
    color: var(--white);
    background-color: var(--blue-secondary);
  }

  .section-block-text-media__image-wrapper picture {
    display: block;
    margin-bottom: 1rem;
  }

  .section-block-text-media__copy {
    max-width: 30rem;
  }

  .section-block-text-media__copy p {
    line-height: 1.8;
  }

  .section-block-text-media__copy p:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .section-block-text-media__copy a,
  .section-block-text-media__cta a {
    line-height: 1.9;
    font-weight: bold;
    color: var(--blue-tertiary);
    text-decoration: none;
  }

  .section-block-text-media__cta a:hover,
  .section-block-text-media__cta a:focus,
  .section-block-text-media__copy a:hover,
  .section-block-text-media__copy a:focus {
    text-decoration: underline;
  }

  @media (--md-viewport) {
    .section-block-text-media {
      display: inline-grid;
      grid-column-gap: 3rem;
      grid-template-columns: 1fr 1fr;
      justify-items: start;
      margin-bottom: 0;
    }

    .section-block-text-media__icon {
      margin-bottom: 1rem;
    }

    .section-block-text-media__title {
      font-size: 3.75rem;
      line-height: 1.1;
    }

    .section-block-text-media__image-wrapper {
      margin-bottom: 0;
      grid-column-start: 2;
      grid-row-start: 1;
      grid-row-end: 99;
    }

    .section-block-text-media__image-wrapper--mirrored {
      grid-column-start: 1;
    }
  }
</style>
