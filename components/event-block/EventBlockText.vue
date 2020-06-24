<template functional>
  <div>
    <img
      v-if="props.showWaveMarker"
      src="/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
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
  </div>
</template>

<script>
  export default {
    props: {
      showWaveMarker: Boolean,
      title: String,
      titleColor: String,
      body: String,
    },
  };
</script>

<style>
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

  @media (--sm-viewport) {
    .event-block-text__title {
      font-size: 5rem;
      font-weight: 900;
    }

    .event-block-text__image {
      margin-bottom: 1rem;
    }

    .event-block-text__copy {
      display: block;
      column-count: 2;
      column-width: 25rem;
      column-gap: 1.2rem;
    }

    .event-block-text__copy p {
      display: inline-block;
      margin-bottom: 1rem;
      max-width: 30rem;
    }
  }
</style>
