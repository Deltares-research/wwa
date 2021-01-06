<template>
  <div>
    <img
      v-if="showWaveMarker"
      src="~/assets/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="animator__slide-up section-block-colofon__icon"
    >
    <component
      :is="showHeadingLevelTop ? 'h2' : 'h3'"
      class="animator__slide-up section-block-colofon__title"
      :class="{
        'section-block-colofon__title--orange': titleColor === 'orange',
        'section-block-colofon__title--blue': titleColor === 'blue',
      }"
      animator-stagger
    >
      {{ title }}
    </component>
    <div
      class="animator__slide-up section-block-colofon__copy"
      v-html="body"
      animator-stagger
    />

    <ul
      class="animator__slide-up section-block-colofon__logos list--inline"
      animator-stagger
    >
      <li
        v-for="partner in partners"
        :key="partner.id"
        class="section-block-colofon__logo-item"
      >
        <a
          v-if="partner.url"
          :href="partner.url"
          target="_blank"
        >
          <img
            :src="`${partner.imageUrl}?h=100&auto=compress,format`"
            :alt="partner.title"
            class="section-block-colofon__logo"
            loading="lazy"
          >
        </a>
        <img
          v-else
          :src="`${partner.imageUrl}?h=100&auto=compress,format`"
          :alt="partner.title"
          class="section-block-colofon__logo"
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
      partners: Array,
      showHeadingLevelTop: Boolean,
    },
  };
</script>

<style>
  .section-block-colofon__icon {
    margin-bottom: .25rem;
  }

  @media (--md-viewport) {
    .section-block-colofon__icon {
      margin-bottom: 1rem;
    }
  }

  .section-block-colofon__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    max-width: 30rem;
  }

  @media (--md-viewport) {
    .section-block-colofon__title {
      margin-bottom: 2rem;
      max-width: 66%;
      font-size: 5rem;
      line-height: 1;
    }
  }

  .section-block-colofon__title--orange {
    color: var(--orange);
  }

  .section-block-colofon__title--blue {
    color: var(--blue-tertiary);
  }

  .section-block-colofon__copy {
    max-width: 30rem;
    margin-bottom: 2rem;
  }

  @media (--md-viewport) {
    .section-block-colofon__copy {
      max-width: 100%;
      margin-bottom: 3rem;
      column-count: 2;
      column-gap: 1.5rem;
    }
  }

  .section-block-colofon__copy h3,
  .section-block-colofon__copy h4,
  .section-block-colofon__copy h5,
  .section-block-colofon__copy h6 {
    margin-bottom: .25rem;
    font-size: 1.5rem;
  }

  @media (--md-viewport) {
    .section-block-colofon__copy h3,
    .section-block-colofon__copy h4,
    .section-block-colofon__copy h5,
    .section-block-colofon__copy h6 {
      margin-bottom: .5rem;
      font-size: 2rem;
    }
  }

  .section-block-colofon__copy p {
    line-height: 1.6;
  }

  @media (--md-viewport) {
    .section-block-colofon__copy p {
      break-inside: avoid;
    }
  }

  .section-block-colofon__copy p:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .section-block-colofon__copy a:hover,
  .section-block-colofon__copy a:focus {
    text-decoration: underline;
  }

  .section-block-colofon__copy ul,
  .section-block-colofon__copy ol {
    margin-bottom: 1rem;
    padding-left: 1.1rem;
    line-height: var(--line-height);
  }

  .section-block-colofon__logos {
    display: flex;
    flex-wrap: wrap;
  }

  @media (--lg-viewport) {
    .section-block-colofon__logos {
      max-width: 50rem;
    }
  }

  li.section-block-colofon__logo-item {
    margin: 0 1.5rem 1.5rem 0;
  }

  @media (--md-viewport) {
    li.section-block-colofon__logo-item {
      margin: 0 2rem 2rem 0;
    }
  }

  .section-block-colofon__logo {
    height: 50px;
  }
</style>
