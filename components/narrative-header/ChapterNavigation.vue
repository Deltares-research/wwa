<template>
  <div class="chapter-navigation">
    <div
      class="chapter-navigation__body"
      :class="{
        'chapter-navigation__body--event-chapter': isEventChapter,
        'chapter-navigation__body--fixed': isFixed
      }"
    >
      <nuxt-link
        v-if="$route.params.language"
        :to="`/${$route.params.language}/events/${$route.params.event}`"
        class="button__back"
      >
        {{ backButtonLabel ? backButtonLabel : 'Back' }}
      </nuxt-link>
      <button
        v-else
        type="button"
        class="chapter-navigation__button button__back"
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
        v-if="showNavigation"
        id="chapter-navigation"
        class="chapter-navigation__dropdown"
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
  import throttle from 'lodash/throttle';
  import { mapState } from 'vuex';

  export default {
    props: {
      pages: Array,
      isEventChapter: Boolean,
      backButtonLabel: String,
      chapterNavigationLabel: String,
    },
    data () {
      return {
        menuHeight: null,
        isFixed: false,
        showNavigation: false,
        throttleFunction: throttle(this.handleScroll),
      };
    },
    computed: {
      ...mapState(['historyAvailable']),
    },
    methods: {
      handleScroll () {
        const navigationTop = this.$el.getBoundingClientRect().top;
        this.isFixed = navigationTop < this.menuHeight;
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
      if (this.isEventChapter) {
        this.handleScroll();
        this.menuHeight = 0;
        window.addEventListener('scroll', this.throttleFunction, 1000);
      } else {
        this.handleScroll();
        window.addEventListener('scroll', this.throttleFunction, 1000);

        const mediaQuery = window.matchMedia('(min-width: 37.5rem) and (min-height: 400px)');

        // See --main-menu-height and --main-menu-height--tall CSS variables for correct values
        mediaQuery.matches ? this.menuHeight = 90 : this.menuHeight = 45;
        mediaQuery.addListener(event => {
          event.matches ? this.menuHeight = 90 : this.menuHeight = 45;
        });
      }
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.throttleFunction, 1000);
    },
  };
</script>

<style>
  .chapter-navigation {
    position: relative;
    height: var(--chapter-navigation-height);
  }

  .chapter-navigation__body {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: var(--chapter-navigation-height);
  }

  @media (--vertical-viewport) {
    .chapter-navigation,
    .chapter-navigation__body {
      height: var(--chapter-navigation-height--tall);
    }
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

  .chapter-navigation__body--event-chapter {
    background-color: var(--blue-secondary);
    background-image: url('~assets/waves.svg');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 30rem auto;
  }

  .chapter-navigation__body--fixed {
    position: fixed;
    top: var(--main-menu-height);
    width: 100%;
  }

  .chapter-navigation__body--event-chapter.chapter-navigation__body--fixed {
    z-index: 1;
    top: 0;
  }

  @media (--vertical-viewport) {
    .chapter-navigation__body--fixed {
      top: var(--main-menu-height--tall);
    }

    .chapter-navigation__body--event-chapter.chapter-navigation__body--fixed {
      width: calc(100% - 2rem);
    }
  }

  @media (--md-viewport) {
    .chapter-navigation__body {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  @media (--lg-viewport) {
    .chapter-navigation__body--fixed {
      width: 45rem;
    }

    .chapter-navigation__body--event-chapter.chapter-navigation__body--fixed {
      max-width: calc(var(--wwa-column-width) - 2rem);
    }
  }

  .chapter-navigation__body--fixed:after {
    opacity: 1;
  }

  .chapter-navigation__body--event-chapter.chapter-navigation__body--fixed:after {
    display: none;
  }

  .chapter-navigation__button {
    padding-top: .45rem;
    padding-bottom: .5rem;
    font-size: .9rem;
  }

  @media (--vertical-viewport) {
    .chapter-navigation__button {
      padding-top: .5rem;
      padding-bottom: .6rem;
      font-size: 1rem;
    }
  }

  .chapter-navigation__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .25rem .5rem .26rem .75rem;
    max-width: 160px;
    appearance: none;
    background-color: var(--blue-primary);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 5px;
    font-family: inherit;
    font-size: .9rem;
    font-weight: 500;
    color: var(--white);
    cursor: pointer;
  }

  @media (--vertical-viewport) {
    .chapter-navigation__select {
      padding-top: .5rem;
      padding-bottom: .6rem;
      font-size: 1rem;
    }
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
    top: 3.3rem;
    left: 1rem;
    right: 1rem;
    background: var(--white);
  }

  @media (--sm-viewport) {
    .chapter-navigation__dropdown {
      left: auto;
      max-width: 500px;
    }
  }

  @media (--md-viewport) {
    .chapter-navigation__dropdown {
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
