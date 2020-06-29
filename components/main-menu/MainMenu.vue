<template>
  <nav :class="`main-menu main-menu--${variant}`">
    <div class="main-menu__section main-menu__logo">
      <nuxt-link
        class="main-menu__navigation-link"
        to="/"
      >
        World Water<br>
        Atlas
      </nuxt-link>
    </div>

    <app-description class="main-menu__section main-menu__description" />

    <ul class="main-menu__section main-menu__navigation list--inline">
      <li
        v-for="link in navigationLinks.mainNavigation"
        :key="link.slug"
      >
        <nuxt-link
          :to="`/${link.slug}`"
          class="main-menu__navigation-link"
        >
          {{ link.title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState } from 'vuex';
  import AppDescription from '~/components/app-description/AppDescription';

  export default {
    props: {
      variant: {
        type: String,
        validator (val) {
          return (val === 'dark' || val === 'light');
        },
        default () {
          return 'dark';
        },
      },
    },
    computed: {
      ...mapState(['navigationLinks']),
    },
    components: {
      AppDescription,
    },
  };
</script>

<style>
  .main-menu {
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3;
  }

  .main-menu__section {
    display: flex;
    align-items: center;
    padding: 0.6rem;
  }

  .main-menu__logo {
    flex-shrink: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .main-menu__description {
    display: none;
  }

  .main-menu__navigation {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .main-menu__navigation-link {
    display: flex;
    text-decoration: none;
  }

  .main-menu--dark {
    background-color: var(--black-primary);
  }

  .main-menu--light {
    background-color: var(--white);
  }

  .main-menu--light .main-menu__navigation-link,
  .main-menu--light .main-menu__navigation-link:hover,
  .main-menu--light .main-menu__logo .main-menu__navigation-link,
  .main-menu--light .main-menu__logo .main-menu__navigation-link:hover {
    color: var(--blue-primary);
  }

  .main-menu--dark .main-menu__navigation-link,
  .main-menu--dark .main-menu__navigation-link:hover {
    color: var(--white);
  }

  .main-menu--dark .main-menu__logo .main-menu__navigation-link,
  .main-menu--dark .main-menu__logo .main-menu__navigation-link:hover {
    color: var(--blue-tertiary);
  }

  @media (--sm-viewport) {
    .main-menu__logo {
      font-weight: 900;
      font-size: 1.4rem;
    }

    .main-menu__navigation {
      font-size: 1rem;
      flex-wrap: nowrap;
    }

    .main-menu__navigation-link {
      padding: 0.6rem;
      font-weight: bold;
    }
  }

  @media (--md-viewport) {
    .main-menu__description {
      display: block;
      flex-basis: 18rem;
      margin-left: 2rem;
      margin-right: auto;
      padding-top: 0;
      padding-right: 0;
      padding-bottom: 0;
      align-self: center;
    }
  }
</style>
