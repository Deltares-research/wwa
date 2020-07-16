<template functional>
  <div>
    <img
      v-if="props.showWaveMarker"
      src="~/assets/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="animator__slide-up event-block-related-stories__icon"
    >

    <h3
      class="animator__slide-up event-block-related-stories__title"
      animator-stagger
    >
      {{ props.title }}
    </h3>

    <h4
      class="animator__slide-up event-block-related-stories__subtitle"
      :class="{
        'event-block-related-stories__subtitle--orange': props.titleColor === 'orange',
        'event-block-related-stories__subtitle--blue': props.titleColor === 'blue',
      }"
      animator-stagger
    >
      {{ props.subtitle }}
    </h4>

    <ul class="list--inline event-block-related-stories__list">
      <li
        v-for="linkedChapter in props.linkedChapters"
        :key="linkedChapter.id"
        class="animator__slide-up event-block-related-stories__list-item"
        animator-stagger
      >
        <nuxt-link
          :to="`/narratives/${linkedChapter.book.slug}/${linkedChapter.chapter.slug}`"
          class="event-block-related-stories__link"
          lang="en"
        >
          <div class="event-block-related-stories__chapter-title">
            {{ linkedChapter.chapter.title }}
          </div>

          <img
            :src="`${linkedChapter.chapter.cover.url}?auto=compress,format&w=500&fit=crop&crop=entropy`"
            alt=""
            class="event-block-related-stories__image"
          >
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import lazyImage from '~/components/lazy-media/LazyMedia';

  export default {
    props: {
      showWaveMarker: Boolean,
      title: String,
      subtitle: String,
      titleColor: String,
      linkedChapters: Array,
    },
  };
</script>

<style>
  .event-block-related-stories__icon {
    margin-bottom: .25rem;
  }

  @media (--md-viewport) {
    .event-block-related-stories__icon {
      margin-bottom: 1rem;
    }
  }

  .event-block-related-stories__title {
    font-size: 1rem;
  }

  @media (--md-viewport) {
    .event-block-related-stories__title {
      font-size: 1.5rem;
    }
  }

  .event-block-related-stories__subtitle {
    font-size: 2rem;
    font-weight: 900;
  }

  .event-block-related-stories__subtitle--orange {
    color: var(--orange);
  }

  .event-block-related-stories__subtitle--blue {
    color: var(--blue-tertiary);
  }

  @media (--md-viewport) {
    .event-block-related-stories__subtitle {
      margin-bottom: 2rem;
      max-width: 66%;
      font-size: 5rem;
      line-height: 1;
    }
  }

  .event-block-related-stories__list {
    display: flex;
    flex-wrap: wrap;
  }

  @media (--md-viewport) {
    .event-block-related-stories__list {
      flex-wrap: nowrap;
      margin: 0 0 0 -.5rem;
    }
  }

  .event-block-related-stories__list-item {
    flex: 1 1 40%;
    margin-bottom: 1rem;
  }

  .event-block-related-stories__list-item:nth-child(odd) {
    margin-left: 0;
    margin-right: .5rem;
  }

  .event-block-related-stories__list-item:nth-child(even) {
    margin-left: .5rem;
    margin-right: 0;
  }

  @media (--md-viewport) {
    .event-block-related-stories__list-item:nth-child(odd),
    .event-block-related-stories__list-item:nth-child(even) {
      flex: 1 1 auto;
      margin-left: .5rem;
      margin-right: .5rem;
      margin-bottom: 0;
    }
  }

  .event-block-related-stories__link {
    position: relative;
    display: block;
    height: 240px;
  }

  @media (--md-viewport) {
    .event-block-related-stories__link {
      height: 380px;
    }
  }

  .event-block-related-stories__link:before {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, .8));
  }

  .event-block-related-stories__chapter-title {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    right: 0;
    z-index: 1;
    font-size: 1rem;
    font-weight: bold;
    text-shadow: 1px 1px 1px var(--primary-blue);
  }

  @media (--md-viewport) {
    .event-block-related-stories__chapter-title {
      font-size: 1.5rem;
    }
  }

  .event-block-related-stories__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
