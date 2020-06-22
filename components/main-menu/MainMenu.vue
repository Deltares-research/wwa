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
        class="main-menu__navigation-item"
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
  padding: 0.5rem;
}

.main-menu__logo {
  flex: 0 0 auto;
  font-size: .9rem;
  font-weight: bold;
  line-height: 1.2;
}

@media (--sm-viewport) {
  .main-menu__logo {
    font-size: 1.3rem;
  }
}

.main-menu__description {
  display: none;
}

@media (--sm-viewport) {
  .main-menu__description {
    display: block;
    flex: 0 1 300px;
    margin-left: 2rem;
    margin-right: auto;
    padding-top: 0;
    padding-bottom: 0;
    align-self: center;
  }
}

.main-menu__navigation {
  justify-content: flex-end;
  flex-wrap: wrap;
  font-size: .75rem;
  font-weight: bold;
  text-transform: uppercase;
}

@media (--sm-viewport) {
  .main-menu__navigation {
    flex: 0 0 auto;
    flex-wrap: nowrap;
    font-size: .875rem;
  }
}

.main-menu__navigation-item {
  flex: 0 0 auto;
}

.main-menu__navigation-link {
  padding: .5rem;
  text-decoration: none;
}

.main-menu--dark {
  background-color: var(--black);
}

.main-menu--light {
  background-color: var(--white);
}

.main-menu--light .main-menu__navigation-link,
.main-menu--light .main-menu__navigation-link:hover,
.main-menu--light .main-menu__logo .main-menu__navigation-link,
.main-menu--light .main-menu__logo .main-menu__navigation-link:hover {
  color: var(--primary-blue);
}

.main-menu--dark .main-menu__navigation-link,
.main-menu--dark .main-menu__navigation-link:hover {
  color: var(--white);
}

.main-menu--dark .main-menu__logo .main-menu__navigation-link,
.main-menu--dark .main-menu__logo .main-menu__navigation-link:hover {
  color: var(--tertiary-blue);
}
</style>
