<template>
  <div class="chapter-navigation">
    <div
      v-if="pages.length > 1"
      class="chapter-navigation__body"
      :class="{ 'chapter-navigation__body--with-background': withBackground }"
    >
      <nuxt-link
        v-if="this.$route.params.language"
        :to="`/${this.$route.params.language}/events/${this.$route.params.event}`"
        class="chapter-navigation__back"
      >
        {{ backButtonLabel ? backButtonLabel : 'Back' }}
      </nuxt-link>

      <button
        @click="toggleNavigation"
        aria-controls="chapter-navigation"
        aria-haspopup="true"
        :aria-expanded="showNavigation ? 'true' : 'false'"
        class="chapter-navigation__select"
        :class="{ 'chapter-navigation__select--open': showNavigation }"
      >
        {{ chapterNavigationLabel ? chapterNavigationLabel : 'In this chapter' }}
      </button>
    </div>

    <nav
      id="chapter-navigation"
      class="chapter-navigation__dropdown"
      :aria-hidden="!showNavigation"
      :class="{ 'chapter-navigation__dropdown--visible': showNavigation }"
    >
      <ol>
        <li
          v-for="page in pages"
          :key="page.slug"
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
</template>

<script>
  export default {
    props: {
      pages: Array,
      withBackground: Boolean,
      backButtonLabel: String,
      chapterNavigationLabel: String,
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
  .chapter-navigation {
    position: relative;
  }

  .chapter-navigation__body {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: .75rem 1rem;
  }

  .chapter-navigation__body--with-background {
    justify-content: space-between;
    background-color: var(--blue-secondary);
    background-image: url('/assets/waves.svg');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 30rem auto;
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
    font-weight: 500;
    text-decoration: none;
    color: var(--white);
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
    background-image: url('/assets/arrow-left.svg');
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

  .chapter-navigation__select:after {
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

  .chapter-navigation__select--open:after {
    transform: rotate(180deg);
  }

  .chapter-navigation__dropdown {
    position: absolute;
    padding: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 0;
    background: var(--white);
    transition: transform var(--narrative-header-event-transition-speed) var(--narrative-header-event-transition-timing-hide);
  }

  .chapter-navigation__body--with-background + .chapter-navigation__dropdown {
    left: 0;
    right: 0;
  }

  .chapter-navigation__dropdown--visible {
    z-index: 10;
    transform: translateY(100%) translateY(-.75rem);
  }

  .chapter-navigation__body--with-background + .chapter-navigation__dropdown--visible {
    z-index: 0;
    left: 0;
    right: 0;
    transition: transform var(--narrative-header-event-transition-speed) var(--narrative-header-event-transition-timing-reveal);
    transform: translateY(100%);
  }

  @media (--sm-viewport) {
    .chapter-navigation__dropdown {
      left: auto;
      max-width: 500px;
    }

    .chapter-navigation__body--with-background + .chapter-navigation__dropdown,
    .chapter-navigation__dropdown--visible,
    .chapter-navigation__body--with-background + .chapter-navigation__dropdown--visible {
      left: auto;
      right: 1rem;
    }
  }

  @media (--md-viewport) {
    .chapter-navigation__body--with-background + .chapter-navigation__dropdown,
    .chapter-navigation__dropdown--visible,
    .chapter-navigation__body--with-background + .chapter-navigation__dropdown--visible {
      right: 2rem;
    }
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
