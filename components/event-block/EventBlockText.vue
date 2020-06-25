<template functional>
  <div>
    <img
      v-if="props.showWaveMarker"
      src="/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="event-block-text__icon"
    >
    <h3
      class="event-block-text__title"
      :class="{
        'event-block-text__title--orange': props.titleColor === 'orange',
        'event-block-text__title--blue': props.titleColor === 'blue',
      }"
    >
      {{ props.title }}
    </h3>
    <div
      class="event-block-text__copy"
      v-html="props.body"
    />
    <p
      v-if="props.callToActionLabel && props.callToActionUrl"
      class="event-block-text__cta"
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
      body: String,
      callToActionLabel: String,
      callToActionUrl: String,
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
    color: var(--tertiary-blue);
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
    font-size: 1rem;
    line-height: 1.6;
  }

  .event-block-text__copy p:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .event-block-text__cta a,
  .event-block-text__copy a {
    font-size: 1rem;
    line-height: 1.9;
    font-weight: bold;
    color: var(--tertiary-blue);
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

    .event-block-text__copy {
      max-width: 100%;
      column-count: 2;
      column-width: 50%;
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
