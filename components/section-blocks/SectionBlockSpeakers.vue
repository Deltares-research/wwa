<template>
  <div class="section-block-speakers">
    <img
      v-if="showWaveMarker"
      src="~/assets/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="animator__slide-up section-block-speakers__icon"
    >

    <h3
      class="animator__slide-up section-block-speakers__title"
      :class="{
        'section-block-speakers__title--orange': titleColor === 'orange',
        'section-block-speakers__title--blue': titleColor === 'blue',
      }"
      animator-stagger
    >
      {{ title }}
    </h3>

    <p
      class="animator__slide-up section-block-speakers__subtitle"
      animator-stagger
    >
      {{ subtitle }}
    </p>

    <swiper
      :options="swiperOptions"
      class="animator__slide-up section-block-speakers__carousel"
      animator-stagger
    >
      <swiper-slide
        v-for="speaker in speakers"
        :key="speaker.id"
        class="section-block-speakers__speaker"
      >
        <div class="section-block-speakers__speaker-wrapper">
          <div class="section-block-speakers__speaker-heading">
            <img
              :src="`${speaker.imageUrl}?auto=compress,format&w=95&h=95&fit=crop&crop=entropy`"
              alt=""
              class="section-block-speakers__speaker-image"
            >

            <div class="section-block-speakers__speaker-meta">
              <h4 class="section-block-speakers__speaker-name">
                {{ speaker.name }}
              </h4>

              <p class="section-block-speakers__speaker-organization">
                {{ speaker.organization }}
              </p>
            </div>
          </div>

          <h5 class="section-block-speakers__speaker-label">
            {{ speaker.subjectLabel }}
          </h5>

          <p class="section-block-speakers__speaker-subject">
            {{ speaker.subject }}
          </p>
        </div>
      </swiper-slide>

      <div
        slot="button-prev"
        class="swiper-button-prev"
      />

      <div
        slot="button-next"
        class="swiper-button-next"
      />

      <div
        slot="scrollbar"
        class="swiper-scrollbar"
      />
    </swiper>
  </div>
</template>

<script>
  import 'swiper/css/swiper.css';

  export default {
    components: {
      Swiper: () => import('vue-awesome-swiper').then(module => module.Swiper),
      SwiperSlide: () => import('vue-awesome-swiper').then(module => module.SwiperSlide),
    },
    props: {
      showWaveMarker: Boolean,
      image: Object,
      title: String,
      subtitle: String,
      titleColor: String,
      speakers: Array,
    },
    data() {
      return {
        swiperOptions: {
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          mousewheel: {
            forceToAxis: true,
          },
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          scrollbar: {
            el: '.swiper-scrollbar',
          },
          breakpoints: {
            768: {
              slidesPerColumn: 2,
              slidesPerView: 2.8,
              spaceBetween: 0,
            },
            0: {
              slidesPerColumn: 1,
              slidesPerView: 1.2,
              spaceBetween: 0,
            },
          },
        },
      };
    },
  };
</script>

<style scoped>
  @media (--md-viewport) {
    .section-block-speakers {
      margin: 0 -.5rem;
    }
  }

  .section-block-speakers__icon {
    margin-bottom: .25rem;
  }

  @media (--md-viewport) {
    .section-block-speakers__icon {
      margin-bottom: 1rem;
    }
  }

  .section-block-speakers__title {
    margin-bottom: .5rem;
    font-size: 2rem;
    font-weight: 900;
  }

  @media (--md-viewport) {
    .section-block-speakers__title {
      margin-left: .5rem;
    }
  }

  .section-block-speakers__title--orange {
    color: var(--orange);
  }

  .section-block-speakers__title--blue {
    color: var(--blue-tertiary);
  }

  @media (--md-viewport) {
    .section-block-speakers__title {
      margin-bottom: 2rem;
      max-width: 66%;
      font-size: 5rem;
      line-height: 1;
    }
  }

  .section-block-speakers__subtitle {
    margin-bottom: .25rem;
    font-size: .75rem;
    text-transform: uppercase;
  }

  @media (--md-viewport) {
    .section-block-speakers__subtitle {
      margin-left: .5rem;
    }
  }

  @media (--md-viewport) {
    .section-block-speakers div.swiper-container-horizontal > div.swiper-scrollbar {
      left: .5rem;
      width: calc(100% - 1rem);
      bottom: 4rem;
    }

    .section-block-speakers div.swiper-button-prev,
    .section-block-speakers div.swiper-button-next {
      bottom: 1rem;
    }

    .section-block-speakers div.swiper-button-prev {
      left: .5rem;
    }

    .section-block-speakers div.swiper-button-next {
      left: calc(32px + 1rem);
    }
  }

  @media (--md-viewport) {
    .section-block-speakers__carousel {
      height: 550px;
    }
  }

  .section-block-speakers__speaker {
    display: flex;
    height: auto;
  }

  @media (--md-viewport) {
    .section-block-speakers__speaker {
      height: 240px;
    }
  }

  .section-block-speakers__speaker-wrapper {
    margin-right: 1rem;
    padding: 1rem;
    width: 100%;
    background-color: var(--blue-secondary);
    border-radius: 5px;
  }

  .section-block-speakers__speaker:last-child .section-block-speakers__speaker-wrapper{
    margin-right: 0;
  }

  @media (--md-viewport) {
    .section-block-speakers__speaker-wrapper {
      margin-left: .5rem;
      margin-right: .5rem;
      margin-bottom: 1rem;
    }

    .section-block-speakers__speaker:last-child .section-block-speakers__speaker-wrapper{
      margin-right: .5rem;
    }
  }

  .section-block-speakers__speaker-heading {
    display: flex;
    margin-bottom: 1rem;
  }

  .section-block-speakers__speaker-image {
    margin-right: 1rem;
    width: 52px;
    height: 52px;
    border: 4px solid var(--blue-secondary);
    border-radius: 50%;
    box-shadow: 0px 5px 18px rgba(44, 39, 36, .3);
  }

  @media (--md-viewport) {
    .section-block-speakers__speaker-image {
      margin-right: 1.5rem;
      width: 85px;
      height: 85px;
    }
  }

  .section-block-speakers__speaker-meta {
    margin-top: .5rem;
  }

  .section-block-speakers__speaker-organization {
    line-height: 1.2;
    opacity: .6;
  }

  .section-block-speakers__speaker-label {
    font-size: .75rem;
    text-transform: uppercase;
    opacity: .7;
  }

  .section-block-speakers__speaker-subject {
    font-weight: 500;
    line-height: 1.2;
  }

  @media (--md-viewport) {
    .section-block-speakers__speaker-name,
    .section-block-speakers__speaker-organization,
    .section-block-speakers__speaker-subject {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .section-block-speakers__speaker-name {
      font-size: 1.5rem;
    }

    .section-block-speakers__speaker-organization {
      font-weight: 500;
    }

    .section-block-speakers__speaker-subject {
      font-size: 1.5rem;
    }
  }
</style>
