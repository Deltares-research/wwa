<template>
  <header class="narrative-header-event">
    <div class="narrative-header-event__header">
      <h1 class="narrative-header-event__header-title">
        {{ chapter.title }}
      </h1>
      <img
        v-if="chapter.cover"
        :src="chapter.cover.responsiveImage.src"
        :srcset="chapter.cover.responsiveImage.srcSet"
        :sizes="chapter.cover.responsiveImage.sizes"
        alt=""
        class="narrative-header-event__header-image"
      >
    </div>

    <div
      v-if="chapter.pages.length > 1"
      class="narrative-header-event__navigation"
    >
      <nuxt-link
        :to="`/${this.$route.params.language}/events/${this.$route.params.event}`"
        class="narrative-header-event__back-button"
      >
        Back
      </nuxt-link>

      <button
        @click="toggleNavigation"
        aria-controls="narrative-event-header-navigation"
        aria-haspopup="true"
        :aria-expanded="showNavigation ? 'true' : 'false'"
        class="narrative-header-event__select"
        :class="{ 'narrative-header-event__select--open': showNavigation }"
      >
        In this chapter
      </button>
    </div>

    <nav
      id="narrative-event-header-navigation"
      class="narrative-header-event__dropdown"
      :aria-hidden="showNavigation ? 'false' : 'true'"
      :class="{ 'narrative-header-event__dropdown--visible': showNavigation }"
    >
      <ol>
        <li
          v-for="page in chapter.pages"
          :key="page.slug"
          class="narrative-header-event__list-item"
        >
          <a
            :href="`#${page.slug}`"
            class="narrative-header-event__link"
            @click.prevent="navigate(page.slug)"
          >
            {{ page.title }}
          </a>
        </li>
      </ol>
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
        showNavigation: false,
      };
    },
    methods: {
      toggleNavigation () {
        this.showNavigation = !this.showNavigation;
      },
      navigate (slug) {
        this.$emit('scrollTo', slug);
        this.showNavigation = false;
      },
    },
  };
</script>

<style>
  :root {
    --narrative-header-event-transition-speed: 300ms;
    --narrative-header-event-transition-timing-hide: cubic-bezier(0.83, 0, 0.73, 1);
    --narrative-header-event-transition-timing-reveal: cubic-bezier(0.17, 0, 0.27, 1);
  }

  .narrative-header-event {
    position: relative;
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
    z-index: 1;
    border-bottom: 1rem solid var(--black);
    width: 100%;
    height: 180px;
    background-image: url(/assets/event-wave.svg), linear-gradient(137deg, #E9E6CF 14.18%, var(--blue-tertiary) 95.78%);
    background-size: 105% auto;
    background-repeat: no-repeat;
    background-position: bottom 0% center;
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
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .75rem 1rem;
    background-color: var(--blue-secondary);
    background-image: url('/assets/waves.svg');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 30rem auto;
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
    color: var(--white);
  }

  .narrative-header-event__back-button:before {
    content: '';
    margin: .1rem .5rem 0 0;
    width: 5px;
    height: 10px;
    background-image: url('/assets/arrow-left.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .narrative-header-event__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem .5rem .6rem .75rem;
    max-width: 160px;
    appearance: none;
    background-color: var(--blue-primary);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 5px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    color: var(--white);
    cursor: pointer;
  }

  .narrative-header-event__select:after {
    content: '';
    display: block;
    margin-left: .5rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('/assets/arrow-down.svg');
    background-size: 1rem;
    background-repeat: no-repeat;
    background-position: center;
    transition: transform var(--narrative-header-event-transition-speed) linear;
  }

  .narrative-header-event__select--open:after {
    transform: rotate(180deg);
  }

  .narrative-header-event__dropdown {
    position: absolute;
    padding: 1rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--white);
    transition: transform var(--narrative-header-event-transition-speed) var(--narrative-header-event-transition-timing-hide);
  }

  @media (--sm-viewport) {
    .narrative-header-event__dropdown {
      left: auto;
      max-width: 500px;
    }
  }

  .narrative-header-event__dropdown--visible {
    transition: transform var(--narrative-header-event-transition-speed) var(--narrative-header-event-transition-timing-reveal);
    transform: translateY(100%);
  }

  .narrative-header-event__list-item:not(:last-child) {
    margin-bottom: 1rem;
  }

  .narrative-header-event__link {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    color: var(--blue-secondary);
  }

  .narrative-header-event__link:hover,
  .narrative-header-event__link:focus {
    color: var(--blue-secondary);
  }
</style>
