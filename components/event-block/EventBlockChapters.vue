<template>
  <div class="event-block-chapters">
    <p class="event-block-chapters__title">
      {{ title }}
    </p>

    <swiper :options="swiperOptions">
      <swiper-slide
        v-for="item in items"
        :key="item.slug"
      >
        <nuxt-link
          :to="`/${item.slug}`"
          class="event-block-chapters__link"
        >
          <span class="event-block-chapters__item-title">{{ item.title }}</span>
          <img
            v-if="item.cover"
            :data-src="`${item.cover.url}?auto=compress&w=470`"
            alt=""
            class="event-block-chapters__item-image swiper-lazy"
          >
          <div
            v-else
            class="event-block-chapters__item-placeholder"
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
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    title: String,
    items: Array,
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        preloadImages: false,
        lazy: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        mousewheel: {
          forceToAxis: true,
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
      },
    };
  },
};
</script>

<style>
.event-block-chapters__title {
  margin-bottom: .25rem;
  font-size: .75rem;
  text-transform: uppercase;
}

@media (--sm-viewport) {
  .event-block-chapters__title {
    font-size: .875rem;
  }
}

.event-block-chapters__link {
  position: relative;
  display: block;
  height: 265px;
}

.event-block-chapters__link:before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 38.44%, rgba(0, 0, 0, 0.7) 100%);
}

.event-block-chapters__item-title {
  position: absolute;
  z-index: 12;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
  text-shadow: 1px 1px 1px var(--primary-blue);
}

.event-block-chapters__item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-block-chapters__item-placeholder {
  position: absolute;
  z-index: 11;
  width: 100%;
  height: 100%;
  background: var(--grey);
}

.swiper-container {
  padding-bottom: 1rem;
}

@media (--sm-viewport) {
  .swiper-container {
    padding-bottom: 4rem;
  }
}

.swiper-container-horizontal > .swiper-scrollbar {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--grey--light);
}

@media (--sm-viewport) {
  .swiper-container-horizontal > .swiper-scrollbar {
    bottom: 3rem;
  }
}

.swiper-scrollbar-drag {
  background: var(--white);
}

.swiper-button-prev {
  display: none;
}

.swiper-button-next {
  display: none;
}

@media (--sm-viewport) {
  .swiper-button-prev,
  .swiper-button-next {
    display: flex;
    top: auto;
    bottom: 0;
    width: 32px;
    height: 32px;
    background: var(--white);
    border-radius: 50%;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    content: '';
    width: 50%;
    height: 50%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    left: calc(32px + .5rem);
  }

  .swiper-button-prev:after {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.3 12.3L1 7l5.3-5.3' stroke='%23000030' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }

  .swiper-button-next:after {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.7 1.7L7 7l-5.3 5.3' stroke='%23000030' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
}
</style>
