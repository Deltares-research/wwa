<template>
  <header class="page-header layout-section__container layout-section__container--padded">
    <div class="page-header__hero">
      <img
        class="page-header__hero-image"
        :src="`${heroImageUrl}?auto=compress,format&w=1080&h=400&fit=crop`"
        alt=""
      >
    </div>

    <div class="page-header__content">
      <button
        type="button"
        @click="goBack"
        class="page-header__back-button button__back"
      >
        Back
      </button>

      <img
        v-if="iconUrl"
        :src="iconUrl"
        alt=""
        class="page-header__icon"
      >

      <h1 class="page-header__title">
        {{ title }}
      </h1>
      <p
        v-if="subTitle"
        class="page-header__subtitle"
      >
        {{ subTitle }}
      </p>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    props: {
      heroImageUrl: {
        type: String,
        required: true,
      },
      iconUrl: String,
      title: {
        type: String,
        required: true,
      },
      subTitle: String,
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
  .page-header {
    position: relative;
  }

  .page-header__hero {
    position: relative;
    height: 0;
    padding-bottom: 80%;
  }

  @media (--sm-viewport) {
    .page-header__hero {
      padding-bottom: 45%;
    }
  }

  @media (--md-viewport) {
    .page-header__hero {
      padding-bottom: 36%;
    }
  }

  .page-header__hero:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,rgba(8,8,8,0),rgba(8,8,8,.7) 84%,var(--black-primary));
  }

  .page-header__hero-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .page-header__content {
    position: absolute;
    left: 2rem;
    right: 3rem;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (--md-viewport) {
    .page-header__content {
      left: 3rem;
      right: 3rem;
    }
  }

  .page-header__back-button {
    margin-bottom: .5rem;
  }

  .page-header__icon {
    margin: .2rem 0 .5rem 0;
    height: 30px;
  }

  @media (--md-viewport) {
    .page-header__icon {
      margin: .7rem 0 .7rem 0;
      height: 50px;
    }
  }

  .page-header__title {
    font-size: 1.8rem;
    line-height: 1;
  }

  @media (--md-viewport) {
    .page-header__title {
      font-size: 3rem;
      line-height: 1;
    }
  }

  .page-header__subtitle {
    width: 100%;
    font-size: 1.3rem;
    line-height: 1;
    margin-top: .5rem;
  }

  @media (--md-viewport) {
    .page-header__subtitle {
      font-size: 1.6rem;
      line-height: 1;
    }
  }
</style>
