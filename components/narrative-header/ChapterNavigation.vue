<template>
  <div class="chapter-navigation">
    <div
      class="chapter-navigation__body"
      :class="{
        'chapter-navigation__body--static': isStatic,
        'chapter-navigation__body--fixed': isFixed
      }"
    >
      <nuxt-link
        v-if="$route.params.language"
        :to="`/${$route.params.language}/events/${$route.params.event}`"
        class="chapter-navigation__back"
      >
        {{ backButtonLabel ? backButtonLabel : 'Back' }}
      </nuxt-link>
      <button
        v-else
        type="button"
        class="chapter-navigation__back"
        @click="goBack"
      >
        Back
      </button>

      <button
        v-if="pages.length > 1"
        @click="toggleNavigation"
        aria-controls="chapter-navigation"
        aria-haspopup="true"
        :aria-expanded="showNavigation ? 'true' : 'false'"
        class="chapter-navigation__select"
        :class="{ 'chapter-navigation__select--open': showNavigation }"
      >
        {{ chapterNavigationLabel ? chapterNavigationLabel : 'In this chapter' }}
      </button>

      <nav
        id="chapter-navigation"
        class="chapter-navigation__dropdown"
        :aria-hidden="!showNavigation"
        :class="{ 'chapter-navigation__dropdown--visible': showNavigation }"
      >
        <ol class="chapter-navigation__list">
          <li
            v-for="(page, index) in pages"
            :key="`${page.slug}-${index}`"
            class="chapter-navigation__list-item"
          >
            <a
              :href="`#${page.slug}`"
              class="chapter-navigation__link"
              @click.prevent="navigate(page.slug)"
            >
              {{ page.title }}
            </a>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce';
  import { mapState } from 'vuex';

  export default {
    props: {
      pages: Array,
      isStatic: Boolean,
      backButtonLabel: String,
      chapterNavigationLabel: String,
    },
    data () {
      return {
        menuHeight: null,
        isFixed: false,
        showNavigation: false,
      };
    },
    computed: {
      ...mapState(['historyAvailable']),
    },
    methods: {
      handleResize () {
        const mediaQuery = window.matchMedia('(min-width: 37.5rem)');
        mediaQuery.matches ? this.menuHeight = 90 : this.menuHeight = 52;
      },
      handleScroll () {
        const navigationTop = this.$el.getBoundingClientRect().top;
        navigationTop < this.menuHeight ? this.isFixed = true : this.isFixed = false;
      },
      toggleNavigation () {
        this.showNavigation = !this.showNavigation;
      },
      navigate (slug) {
        this.$emit('scrollTo', slug);
        this.showNavigation = false;
      },
      goBack () {
        this.historyAvailable ? this.$router.back() : this.$router.push('/');
      },
    },
    mounted () {
      if (!this.isStatic) {
        this.handleScroll();
        window.addEventListener('scroll', debounce(this.handleScroll), 1000);

        this.handleResize();
        window.addEventListener('resize', debounce(this.handleResize), 1000);
      }
    },
    beforeDestroy () {
      if (!this.isStatic) {
        window.removeEventListener('scroll', debounce(this.handleScroll), 1000);
        window.removeEventListener('resize', debounce(this.handleResize), 1000);
      }
    },
  };
</script>

<style>
  .chapter-navigation {
    position: relative;
  }

  .chapter-navigation__body {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .75rem 1rem;
  }

  .chapter-navigation__body:after {
    z-index: -1;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--blue-primary);
    opacity: 0;
    transition: opacity .1s ease-out;
  }

  .chapter-navigation__body--static {
    background-color: var(--blue-secondary);
    background-image: url('~assets/waves.svg');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 30rem auto;
  }

  .chapter-navigation__body--fixed {
    position: fixed;
    top: 57px;
    width: 100%;
  }

  @media (--sm-viewport) {
    .chapter-navigation__body--fixed {
      top: 90px;
    }
  }

  @media (--lg-viewport) {
    .chapter-navigation__body--fixed {
      width: 45rem;
    }
  }

  .chapter-navigation__body--fixed:after {
    opacity: 1;
  }

  @media (--md-viewport) {
    .chapter-navigation__body {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  .chapter-navigation__back {
    display: flex;
    align-items: center;
    font-size: inherit;
    font-weight: 500;
    text-decoration: none;
    color: var(--white);
    background: none;
    border: none;
    cursor: pointer;
    appearance: none;
  }

  .chapter-navigation__back:hover,
  .chapter-navigation__back:focus {
    color: var(--white);
  }

  .chapter-navigation__back:before {
    content: '';
    margin: .1rem .5rem 0 0;
    width: 5px;
    height: 10px;
    background-image: url('~assets/arrow-left.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .chapter-navigation__select {
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

  .chapter-navigation__body--fixed .chapter-navigation__select {
    background-color: var(--blue-primary--lighter);
  }

  .chapter-navigation__select:after {
    content: '';
    display: block;
    margin-left: .5rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('~assets/arrow-down.svg');
    background-size: 1rem;
    background-repeat: no-repeat;
    background-position: center;
    transition: transform .3s ease
  }

  .chapter-navigation__select--open:after {
    transform: rotate(180deg);
  }

  .chapter-navigation__dropdown {
    position: absolute;
    padding: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 100%;
    background: var(--white);
  }

  .chapter-navigation__body--static + .chapter-navigation__dropdown {
    left: 0;
    right: 0;
  }

  .chapter-navigation__dropdown--visible {
    transform: translateY(100%) translateY(3.3rem);
  }

  .chapter-navigation__body--static + .chapter-navigation__dropdown--visible {
    left: 0;
    right: 0;
    transform: translateY(100%) translateY(4rem);
  }

  @media (--sm-viewport) {
    .chapter-navigation__dropdown {
      left: auto;
      max-width: 500px;
    }

    .chapter-navigation__body--static + .chapter-navigation__dropdown,
    .chapter-navigation__dropdown--visible,
    .chapter-navigation__body--static + .chapter-navigation__dropdown--visible {
      left: auto;
      right: 1rem;
    }
  }

  @media (--md-viewport) {
    .chapter-navigation__body--static + .chapter-navigation__dropdown,
    .chapter-navigation__dropdown--visible,
    .chapter-navigation__body--static + .chapter-navigation__dropdown--visible {
      right: 2rem;
    }
  }

  .chapter-navigation__list {
    list-style: none;
  }

  .chapter-navigation__list-item:not(:last-child) {
    margin-bottom: 1rem;
  }

  .chapter-navigation__link {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    color: var(--blue-secondary);
  }

  .chapter-navigation__link:hover,
  .chapter-navigation__link:focus {
    color: var(--blue-secondary);
  }
</style>
