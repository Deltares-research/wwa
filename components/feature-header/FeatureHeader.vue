<template>
  <header class="layout-section--wave-bottom-blue">
    <div class="layout-section__container layout-section__container--padded">
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
  .feature-header__back-button {
    margin-bottom: 1rem;
  }

  .feature-header__banner {
    display: flex;
    margin-bottom: 1rem;
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
