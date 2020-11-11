<template>
  <div>
    <img
      v-if="showWaveMarker"
      src="~/assets/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="animator__slide-up section-block-text__icon"
    >
    <component
      :is="showHeadingLevelTop ? 'h2' : 'h3'"
      class="animator__slide-up section-block-text__title"
      :class="{
        'section-block-text__title--orange': titleColor === 'orange',
        'section-block-text__title--blue': titleColor === 'blue',
        'section-block-text__title--small': showSmallTitle,
      }"
      animator-stagger
    >
      {{ title }}
    </component>
    <p
      v-if="subtitle"
      class="section-block-text__subtitle"
    >
      {{ subtitle }}
    </p>
    <div
      class="section-block-text__copy animator__slide-up section-block-text__copy"
      v-html="body"
      animator-stagger
    />
    <p
      v-if="callToActionLabel && callToActionUrl"
      class="animator__slide-up section-block-text__cta"
      animator-stagger
    >
      <a :href="callToActionUrl">
        {{ callToActionLabel }}
      </a>
    </p>
    <ul
      v-if="files && files.length"
      class="animator__slide-up list--inline"
      animator-stagger
    >
      <li
        v-for="file in files"
        :key="file.url"
        class="section-block-text__cta"
      >
        <a :href="file.url">
          {{ file.label }}
        </a>
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
      subtitle: String,
      body: String,
      callToActionLabel: String,
      callToActionUrl: String,
      files: Array,
      showSmallTitle: Boolean,
      showHeadingLevelTop: Boolean,
    },
  };
</script>

<style>
  .section-block-text__icon {
    margin-bottom: .25rem;
  }

  .section-block-text__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  .section-block-text__title--orange {
    color: var(--orange);
  }

  .section-block-text__title--blue {
    color: var(--blue-tertiary);
  }

  .section-block-text__subtitle {
    max-width: 30rem;
    margin-top: -.5rem;
    margin-bottom: 2rem;
    font-weight: 500;
    line-height: 1.2;
  }

  .section-block-text__copy {
    max-width: 30rem;
  }

  .section-block-text__copy h3,
  .section-block-text__copy h4,
  .section-block-text__copy h5,
  .section-block-text__copy h6 {
    margin-bottom: .25rem;
    font-size: 1.5rem;
  }

  .section-block-text__copy p {
    line-height: 1.6;
  }

  .section-block-text__copy p:first-child {
    font-weight: bold;
  }

  .section-block-text__copy p:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  li.section-block-text__cta {
    margin-right: 1rem;
  }

  .section-block-text__cta a,
  .section-block-text__copy a {
    line-height: 1.9;
    font-weight: bold;
    color: var(--blue-tertiary);
    text-decoration: none;
  }

  .section-block-text__cta a:hover,
  .section-block-text__cta a:focus,
  .section-block-text__copy a:hover,
  .section-block-text__copy a:focus {
    text-decoration: underline;
  }

  @media (--md-viewport) {
    .section-block-text__icon {
      margin-bottom: 1rem;
    }

    .section-block-text__title {
      margin-bottom: 2rem;
      max-width: 66%;
      font-size: 5rem;
      line-height: 1;
    }

    .section-block-text__title--small {
      font-size: 3rem;
    }

    .section-block-text__copy {
      max-width: 100%;
      column-count: 2;
      column-gap: 1.5rem;
    }

    .section-block-text__copy h3,
    .section-block-text__copy h4,
    .section-block-text__copy h5,
    .section-block-text__copy h6 {
      margin-bottom: .5rem;
      font-size: 2rem;
    }

    .section-block-text__copy p {
      break-inside: avoid;
    }
  }
</style>
