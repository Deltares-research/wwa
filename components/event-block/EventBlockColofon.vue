<template functional>
  <div>
    <img
      v-if="props.showWaveMarker"
      src="/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="event-block-colofon__icon"
    >
    <h3
      class="event-block-colofon__title"
      :class="{
        'event-block-colofon__title--orange': props.titleColor === 'orange',
        'event-block-colofon__title--blue': props.titleColor === 'blue',
      }"
    >
      {{ props.title }}
    </h3>
    <div
      class="event-block-colofon__copy"
      v-html="props.body"
    />

    <ul class="event-block-colofon__logos list--inline">
      <li
        v-for="logo in props.logos"
        :key="logo.id"
        class="event-block-colofon__logo-item"
      >
        <img
          :src="logo.url"
          :alt="logo.alt"
          class="event-block-colofon__logo"
          loading="lazy"
        >
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      showWaveMarker: Boolean,
      title: String,
      titleColor: String,
      body: String,
      logos: Array,
    },
  };
</script>

<style>
  .event-block-colofon__icon {
    margin-bottom: .25rem;
  }

  @media (--md-viewport) {
    .event-block-colofon__icon {
      margin-bottom: 1rem;
    }
  }

  .event-block-colofon__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  @media (--md-viewport) {
    .event-block-colofon__title {
      margin-bottom: 2rem;
      max-width: 66%;
      font-size: 5rem;
      line-height: 1;
    }
  }

  .event-block-colofon__title--orange {
    color: var(--orange);
  }

  .event-block-colofon__title--blue {
    color: var(--blue-tertiary);
  }

  .event-block-colofon__copy {
    max-width: 30rem;
    margin-bottom: 1.5rem;
  }

  @media (--md-viewport) {
    .event-block-colofon__copy {
      max-width: 100%;
      column-count: 2;
      column-gap: 1.5rem;
    }
  }

  .event-block-colofon__copy h3,
  .event-block-colofon__copy h4,
  .event-block-colofon__copy h5,
  .event-block-colofon__copy h6 {
    margin-bottom: .25rem;
    font-size: 1.5rem;
  }

  @media (--md-viewport) {
    .event-block-colofon__copy h3,
    .event-block-colofon__copy h4,
    .event-block-colofon__copy h5,
    .event-block-colofon__copy h6 {
      margin-bottom: .5rem;
      font-size: 2rem;
    }
  }

  .event-block-colofon__copy p {
    line-height: 1.6;
  }

  @media (--md-viewport) {
    .event-block-colofon__copy p {
      break-inside: avoid;
    }
  }

  .event-block-colofon__copy p:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .event-block-colofon__copy a:hover,
  .event-block-colofon__copy a:focus {
    text-decoration: underline;
  }

  .event-block-colofon__logos {
    display: flex;
    flex-wrap: wrap;
    max-width: 30rem;
  }

  .event-block-colofon__logo-item {
    margin-bottom: .5rem;
  }

  .event-block-colofon__logo {
    height: 50px;
  }
</style>
