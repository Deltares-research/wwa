<template functional>
  <div class="event-banner">
    <div class="animator__clip animator__clip-container">
      <div class="animator__clip-content event-banner__banner">
        <span class="animator__fade event-banner__gradient" />
        <span class="event-banner__wave" />
        <img
          v-if="props.bannerIcon"
          :src="`${props.bannerIcon.imgixHost}${props.bannerIcon.value.path}?auto=compress,format&h=70`"
          :width="props.bannerIcon.value.width"
          :height="props.bannerIcon.value.height"
          alt=""
          class="animator__slide-in event-banner__icon"
          animator-stagger
        >
        <h2
          class="animator__slide-in event-banner__title"
          :class="{
            'sr-only': props.visuallyHideName
          }"
          animator-stagger
        >
          <span v-html="props.name" />
        </h2>
        <p
          class="animator__slide-in event-banner__date"
          animator-stagger
        >
          {{ props.displayDate }}
        </p>
      </div>
    </div>

    <aside class="animator__fade event-banner__credits">
      <p class="event-banner__credits-content">
        <span class="event-banner__credits-title">
          {{ props.bannerTagline }}
        </span>
        <nuxt-link
          to="/"
          class="event-banner__credits-link"
          lang="en"
        >
          The World Water Atlas
        </nuxt-link>
      </p>
    </aside>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      visuallyHideName: Boolean,
      displayDate: String,
      bannerIcon: Object,
      bannerTagline: String,
    },
  };
</script>

<style>
  @media (--sm-viewport) {
    .event-banner {
      padding: 0 1rem;
    }
  }

  .event-banner__banner {
    position: relative;
    margin-bottom: .6rem;
    padding: 2.8rem 2rem;
    color: var(--blue-primary);
  }

  @media (--sm-viewport) {
    .event-banner__banner {
      margin-bottom: 1rem;
      padding: 6rem 2rem;

      border-radius: 5px;
      overflow: hidden;
    }
  }

  .event-banner__banner > *:not(.event-banner__gradient):not(.event-banner__wave) {
    position: relative;
    z-index: 3;
  }

  .event-banner__gradient,
  .event-banner__wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* gradient background */
  .event-banner__gradient {
    z-index: 1;
    background-image: linear-gradient(137deg, #E9E6CF 14.18%, var(--blue-tertiary) 95.78%);
    background-size: cover;
  }

  /* wave lines */
  .event-banner__wave {
    z-index: 2;

    background-image: url('~assets/event-wave.svg');
    background-size: 105% auto;
    background-repeat: no-repeat;
    background-position: bottom 0% center;
  }

  @media (--lg-viewport) {
    .event-banner__wave {
      background-position: bottom 20% center;
    }
  }

  /* design week logo */
  .event-banner__icon {
    margin-bottom: .5rem;
    max-height: 50px;
    width: auto;
  }

  @media (--sm-viewport) {
    .event-banner__icon {
      margin-bottom: .75rem;
      max-height: 70px;
    }
  }

  .event-banner__title {
    font-size: 2rem;
    font-weight: bold;
  }

  .event-banner__title em {
    font-style: normal;
  }

  @media (--sm-viewport) {
    .event-banner__title {
      font-size: 3.75rem;
      font-weight: 900;
    }
  }

  .event-banner__date {
    font-weight: 500;
  }

  @media (--sm-viewport) {
    .event-banner__date {
      font-size: 2rem;
      font-weight: bold;
    }
  }

  .event-banner__credits {
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }

  @media (--sm-viewport) {
    .event-banner__credits {
      padding: 0;
    }
  }

  .event-banner__credits:before {
    content: '';
    display: block;
    margin-right: .5rem;
    width: 32px;
    height: 30px;
    background-image: url('~assets/globe-small.png');
  }

  .event-banner__credits-content {
    line-height: 1;
  }

  .event-banner__credits-title {
    display: block;
    font-size: .625rem;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.2;
    color: var(--black-tertiary);
  }

  .event-banner__credits-link {
    font-weight: 500;
    text-decoration: none;
    color: var(--blue-tertiary);
  }
</style>
