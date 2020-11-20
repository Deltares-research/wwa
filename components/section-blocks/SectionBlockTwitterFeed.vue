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
      }"
      animator-stagger
    >
      {{ title }}
    </component>

    <swiper
      :options="swiperOptions"
      class="animator__slide-up"
      animator-stagger
    >
      <swiper-slide
        v-for="tweet in tweets"
        :key="tweet.id"
        class="section-block-twitter-feed__tweet"
      >
        <div class="section-block-twitter-feed__tweet-header">
          <img
            :src="tweet.user.profile_image_url_https"
            alt=""
            class="section-block-twitter-feed__tweet-icon"
          >

          <p class="section-block-twitter-feed__tweet-user">
            <span class="section-block-twitter-feed__tweet-username">{{ tweet.user.name }}</span>
            <a
              :href="`https://twitter.com/${tweet.user.screen_name}`"
              target="_blank"
            >
              @{{ tweet.user.screen_name }}
            </a>
          </p>

          <p class="section-block-twitter-feed__tweet-date">
            {{ formatDate(tweet.created_at) }}
          </p>
        </div>

        <div
          v-html="tweet.full_text"
          class="section-block-twitter-feed__tweet-content"
        />

        <img
          v-if="tweet.entities.media"
          :src="tweet.entities.media[0].media_url_https"
          alt=""
          class="section-block-twitter-feed__tweet-image"
        >

        <div
          v-if="tweet.retweeted_status"
          class="section-block-twitter-feed__tweet-retweet"
        >
          <div class="section-block-twitter-feed__tweet-header">
            <img
              :src="tweet.retweeted_status.user.profile_image_url_https"
              alt=""
              class="section-block-twitter-feed__tweet-icon"
            >

            <p class="section-block-twitter-feed__tweet-user">
              <span class="section-block-twitter-feed__tweet-username">{{ tweet.retweeted_status.user.name }}</span>
              <a
                :href="`https://twitter.com/${tweet.user.screen_name}`"
                target="_blank"
              >
                @{{ tweet.retweeted_status.user.screen_name }}
              </a>
            </p>
          </div>

          <p
            v-html="tweet.retweeted_status.full_text"
            class="section-block-twitter-feed__content"
          />
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
  import axios from 'axios';
  import 'swiper/css/swiper.css';

  export default {
    components: {
      Swiper: () => import('vue-awesome-swiper').then(module => module.Swiper),
      SwiperSlide: () => import('vue-awesome-swiper').then(module => module.SwiperSlide),
    },
    props: {
      title: String,
      showWaveMarker: Boolean,
      titleColor: String,
      handle: String,
      numberOfTweets: Number,
      showHeadingLevelTop: Boolean,
    },
    data() {
      return {
        tweets: null,
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
    mounted () {
      axios
        .get(`/.netlify/functions/twitter-proxy/?screen_name=${this.handle}&count=${this.numberOfTweets}&tweet_mode=extended`)
        .then(response => (this.tweets = response.data));
    },
    methods: {
      formatDate(date) {
        const dateObject = new Date(date);
        const now = new Date();

        if(dateObject.getFullYear() === now.getFullYear()) {
          return new Date(date).toLocaleDateString('en', { day: 'numeric', month: 'short' });
        } else {
          return new Date(date).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' });
        }
      },
    },
  };
</script>

<style>
  .section-block-twitter-feed__tweet {
    height: auto;
    background-color: var(--blue-primary--light);
    color: var(--white);
  }

  .section-block-twitter-feed__tweet a {
    text-decoration: none;
  }

  .section-block-twitter-feed__tweet a:hover,
  .section-block-twitter-feed__tweet a:focus {
    text-decoration: underline;
  }

  .section-block-twitter-feed__tweet-header {
    display: flex;
    align-items: center;
    margin: .8rem 1rem 1rem 1rem;
  }

  .section-block-twitter-feed__tweet-icon {
    margin-right: 1rem;
    border-radius: 50%;
  }

  .section-block-twitter-feed__tweet-user,
  .section-block-twitter-feed__tweet-date {
    line-height: 1.3;
  }

  .section-block-twitter-feed__tweet-user {
    flex: 1;
  }

  .section-block-twitter-feed__tweet-username {
    display: block;
    font-weight: bold;
  }

  .section-block-twitter-feed__tweet-date {
    font-size: 1rem;
  }

  .section-block-twitter-feed__tweet-content {
    margin: 0 1rem 1rem 1rem;
    line-height: 1.5;
  }

  .section-block-twitter-feed__tweet-image {
    margin: 1rem;
    width: calc(100% - 2rem);
  }

  .section-block-twitter-feed__tweet-retweet {
    margin: 1.5rem 1rem 1rem 1rem;
    padding-left: 1rem;
    border-left: 2px solid var(--orange);
  }

  .section-block-twitter-feed__tweet-retweet .section-block-twitter-feed__tweet-header {
    margin: 0 0 1rem 0;
  }
</style>
