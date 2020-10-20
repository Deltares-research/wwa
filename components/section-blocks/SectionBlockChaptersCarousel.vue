<template>
  <div class="animator__slide-up section-block-chapters-carousel">
    <p class="section-block-chapters-carousel__title">
      {{ title }}
    </p>

    <swiper :options="swiperOptions">
      <swiper-slide
        v-for="item in items"
        :key="item.slug"
      >
        <nuxt-link
          :to="item.slug"
          append
          class="section-block-chapters-carousel__link"
        >
          <span class="section-block-chapters-carousel__item-title">{{ item.title }}</span>
          <img
            v-if="item.coverUrl"
            :data-src="`${item.coverUrl}?auto=compress,format&w=530`"
            alt=""
            class="section-block-chapters-carousel__item-image swiper-lazy"
            data-swiper-parallax="-10%"
          >
          <div
            v-else
            class="section-block-chapters-carousel__item-placeholder"
          />
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
        </nuxt-link>
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
      title: String,
      items: Array,
    },
    data() {
      return {
        swiperOptions: {
          preloadImages: false,
          lazy: {
            loadOnTransitionStart: true,
          },
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
            600: {
              slidesPerView: 2.8,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
          },
          parallax: true,
        },
      };
    },
  };
</script>

<style>
  .section-block-chapters-carousel__title {
    margin-bottom: .25rem;
    font-size: .75rem;
    text-transform: uppercase;
  }

  @media (--sm-viewport) {
    .section-block-chapters-carousel__title {
      font-size: .875rem;
    }
  }

  .section-block-chapters-carousel__link {
    position: relative;
    display: block;
    height: 265px;
    overflow: hidden;
  }

  .section-block-chapters-carousel__link:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 38.44%, rgba(0, 0, 0, 0.7) 100%);
  }

  .section-block-chapters-carousel__item-title {
    position: absolute;
    z-index: 12;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;
    text-shadow: 1px 1px 1px var(--blue-primary);
  }

  .section-block-chapters-carousel__item-image {
    position: relative;
    top: -20%;
    left: -20%;
    width: 140%;
    height: 140%;
    max-width: none;
    object-fit: cover;
  }

  .section-block-chapters-carousel__item-placeholder {
    position: absolute;
    z-index: 11;
    width: 100%;
    height: 100%;
    background: var(--black-secondary);
  }
</style>
