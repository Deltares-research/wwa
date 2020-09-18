<template>
  <header class="feature-header layout-section__container layout-section__container--padded">
    <div class="feature-header__hero">
      <img
        class="feature-header__hero-image"
        :src="`${heroImageUrl}?auto=compress,format&w=1080&h=400&fit=crop`"
        alt=""
      >
    </div>

    <div class="feature-header__content">
      <button
        type="button"
        @click="goBack"
        class="feature-header__back-button button__back"
      >
        Back
      </button>

      <div class="feature-header__banner">
        <img
          :src="iconUrl"
          alt=""
          class="feature-header__icon"
        >

        <h1 class="feature-header__title">
          {{ title }}
        </h1>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    props: {
      heroImageUrl: String,
      iconUrl: String,
      title: String,
    },
    computed: {
      ...mapState(['historyAvailable']),
    },
    methods: {
      goBack () {
        this.historyAvailable ? this.$router.back() : this.$router.push('/');
      },
    },
  };
</script>

<style>
  .feature-header {
    position: relative;
  }

  .feature-header__hero {
    position: relative;
    height: 0;
    padding-bottom: 36%;
  }

  .feature-header__hero:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,rgba(8,8,8,0),rgba(8,8,8,.7) 84%,var(--black-primary));
  }

  .feature-header__hero-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .feature-header__content {
    position: absolute;
    left: 2rem;
    right: 3rem;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (--md-viewport) {
    .feature-header__content {
      left: 3rem;
      right: 3rem;
    }
  }

  .feature-header__back-button {
    margin-bottom: .5rem;
  }

  .feature-header__banner {
    display: flex;
  }

  .feature-header__icon {
    margin: .1rem .5rem 0 0;
    height: 30px;
  }

  @media (--md-viewport) {
    .feature-header__icon {
      margin: .6rem 1rem 0 0;
      height: 50px;
    }
  }

  .feature-header__title {
    font-size: 2rem;
    line-height: 1;
  }

  @media (--md-viewport) {
    .feature-header__title {
      font-size: 4rem;
      line-height: 1;
    }
  }
</style>
