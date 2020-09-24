<template>
  <div>
    <img
      v-if="showWaveMarker"
      src="~/assets/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="animator__slide-up event-block-text__icon"
    >
    <h3
      class="animator__slide-up event-block-text__title"
      :class="{
        'event-block-text__title--orange': titleColor === 'orange',
        'event-block-text__title--blue': titleColor === 'blue',
        'event-block-text__title--small': showSmallTitle,
      }"
      animator-stagger
    >
      {{ title }}
    </h3>
    <p
      v-if="subtitle"
      class="event-block-text__subtitle"
    >
      {{ subtitle }}
    </p>
    <div
      class="event-block-text__copy animator__slide-up event-block-text__copy"
      v-html="body"
      animator-stagger
    />
    <p
      v-if="callToActionLabel && callToActionUrl"
      class="animator__slide-up event-block-text__cta"
      animator-stagger
    >
      <a :href="callToActionUrl">
        {{ callToActionLabel }}
      </a>
    </p>
    <p
      v-if="file"
      class="animator__slide-up event-block-text__cta"
      animator-stagger
    >
      <a :href="file.url">
        {{ file.title }}
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
      subtitle: String,
      body: String,
      callToActionLabel: String,
      callToActionUrl: String,
      file: String,
      showSmallTitle: Boolean,
    },
  };
</script>

<style>
  .event-block-text__icon {
    margin-bottom: .25rem;
  }

  .event-block-text__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  .event-block-text__title--orange {
    color: var(--orange);
  }

  .event-block-text__title--blue {
    color: var(--blue-tertiary);
  }

  .event-block-text__subtitle {
    max-width: 30rem;
    margin-top: -.5rem;
    margin-bottom: 2rem;
    font-weight: 500;
    line-height: 1.2;
  }

  .event-block-text__copy {
    max-width: 30rem;
  }

  .event-block-text__copy h3,
  .event-block-text__copy h4,
  .event-block-text__copy h5,
  .event-block-text__copy h6 {
    margin-bottom: .25rem;
    font-size: 1.5rem;
  }

  .event-block-text__copy p {
    line-height: 1.6;
  }

  .event-block-text__copy p:first-child {
    font-weight: bold;
  }

  .event-block-text__copy p:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .event-block-text__cta a,
  .event-block-text__copy a {
    line-height: 1.9;
    font-weight: bold;
    color: var(--blue-tertiary);
    text-decoration: none;
  }

  .event-block-text__cta a:hover,
  .event-block-text__cta a:focus,
  .event-block-text__copy a:hover,
  .event-block-text__copy a:focus {
    text-decoration: underline;
  }

  @media (--md-viewport) {
    .event-block-text__icon {
      margin-bottom: 1rem;
    }

    .event-block-text__title {
      margin-bottom: 2rem;
      max-width: 66%;
      font-size: 5rem;
      line-height: 1;
    }

    .event-block-text__title--small {
      font-size: 3rem;
    }

    .event-block-text__copy {
      max-width: 100%;
      column-count: 2;
      column-gap: 1.5rem;
    }

    .event-block-text__copy h3,
    .event-block-text__copy h4,
    .event-block-text__copy h5,
    .event-block-text__copy h6 {
      margin-bottom: .5rem;
      font-size: 2rem;
    }

    .event-block-text__copy p {
      break-inside: avoid;
    }
  }
</style>
