<template>
  <header class="narrative-header-event">
    <div class="narrative-header-event__header">
      <h1 class="narrative-header-event__header-title">
        {{ chapter.title }}
      </h1>
      <img
        :src="chapter.cover.responsiveImage.src"
        :srcset="chapter.cover.responsiveImage.srcSet"
        :sizes="chapter.cover.responsiveImage.sizes"
        alt=""
        class="narrative-header-event__header-image"
      >
    </div>

    <nav
      v-if="chapter.pages.length > 1"
      class="narrative-header-event__navigation"
    >
      <nuxt-link
        to="/"
        class="narrative-header-event__back-button"
      >
        Back
      </nuxt-link>

      <select
        @change="navigate()"
        v-model="selectedPage"
        class="narrative-header-event__select"
      >
        <option
          value=""
          selected
          disabled
        >
          In this chapter
        </option>
        <option
          v-for="page in chapter.pages"
          :key="page.slug"
          :value="page.slug"
        >
          {{ page.title }}
        </option>
      </select>
    </nav>
  </header>
</template>

<script>
  export default {
    props: {
      chapter: Object,
    },
    data () {
      return {
        selectedPage: '',
      };
    },
    methods: {
      navigate () {
        this.$emit('scrollTo', this.selectedPage);
        this.selectedPage = '';
      },
    },
  };
</script>

<style>
  .narrative-header-event {
    margin: 0 -1rem 2rem -1rem;
  }

  @media (--sm-viewport) {
    .narrative-header-event {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .narrative-header-event__header {
    position: relative;
    margin-bottom: 1rem;
    width: 100%;
    height: 180px;
  }

  @media (--md-viewport) {
    .narrative-header-event__header {
      height: 360px;
    }
  }

  .narrative-header-event__header:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  }

  .narrative-header-event__header-title {
    position: absolute;
    z-index: 1;
    left: 1rem;
    bottom: 1.5rem;
  }

  @media (--md-viewport) {
    .narrative-header-event__header-title {
      left: 2rem;
      bottom: 2.5rem;
      font-size: 3.75rem;
      font-weight: 900;
      line-height: 1.1;
    }
  }

  .narrative-header-event__header-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .narrative-header-event__navigation {
    display: flex;
    justify-content: space-between;
    padding: .75rem 1rem;
    background-color: var(--blue-secondary);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 154 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23FFF' fill='none' fill-rule='evenodd' opacity='.4'%3E%3Cpath d='M-201.3 224c36.4-42.2 60-66.2 182.7-58 75.1 4.9 72.1-74.2 187.4-91.6'/%3E%3Cpath d='M-202.3 217.2c36.5-42 60-66 182.8-58 75 5 72-74 187.4-91.5'/%3E%3Cpath d='M-203.2 210.5c36.5-42 60-66.1 182.7-58 75.1 5 72.1-74.1 187.4-91.5'/%3E%3Cpath d='M-204.1 203.8c36.4-42.1 60-66.1 182.7-58 75.1 5 72.1-74.1 187.4-91.5'/%3E%3Cpath d='M-205 197c36.4-42 60-66 182.7-58 75 5 72-74 187.4-91.4'/%3E%3Cpath d='M-206 190.4c36.5-42.1 60-66.1 182.7-58 75.2 5 72.1-74.1 187.5-91.5'/%3E%3Cpath d='M-207 183.6c36.5-42 60-66 182.8-58 75.1 5 72.1-74 187.4-91.4'/%3E%3Cpath d='M-207.9 177c36.5-42.2 60-66.2 182.8-58 75 4.9 72-74.2 187.4-91.6'/%3E%3Cpath d='M-208.8 170.2c36.5-42 60-66 182.7-58 75.2 5 72.1-74 187.5-91.5'/%3E%3Cpath d='M-209.7 163.5c36.4-42 60-66.1 182.7-58 75.1 5 72.1-74.1 187.4-91.5'/%3E%3Cpath d='M-210.7 156.8c36.5-42.1 60-66.1 182.8-58 75 5 72-74.1 187.4-91.5'/%3E%3Cpath d='M-211.6 150c36.5-42 60-66 182.7-58C46.3 97 43.3 18 158.6.7'/%3E%3C/g%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 10rem auto;
  }

  @media (--md-viewport) {
    .narrative-header-event__navigation {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  .narrative-header-event__back-button {
    display: flex;
    align-items: center;
    font-weight: 500;
    text-decoration: none;
    color: var(--white);
  }

  .narrative-header-event__back-button:hover,
  .narrative-header-event__back-button:focus {
    color: var(--blue-primary);
  }

  .narrative-header-event__back-button:before {
    content: '';
    margin: .1rem .5rem 0 0;
    width: 5px;
    height: 10px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 7 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.3 1L2 5l3.3 4' stroke='%2368D4F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .narrative-header-event__select {
    padding: .5rem 2rem .6rem .75rem;
    max-width: 160px;
    appearance: none;
    background-color: var(--blue-primary);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 2l6 5.6L14 2' stroke='%2368D4F5' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: 1rem;
    background-repeat: no-repeat;
    background-position: right .5rem center;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 5px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    color: var(--white);
    cursor: pointer;
  }
</style>
