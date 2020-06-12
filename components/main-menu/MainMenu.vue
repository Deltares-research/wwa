<template>
  <nav :class="`main-menu main-menu--${variant}`">
    <div class="main-menu__section main-menu__section--logo">
      <nuxt-link
        class="menu__item"
        to="/"
      >
        World Water<br>
        Atlas
      </nuxt-link>
    </div>

    <div class="main-menu__section main-menu__section--navigation">
      <nuxt-link
        class="menu__item"
        to="/events"
      >
        Events
      </nuxt-link>
      <nuxt-link
        class="menu__item"
        to="/about"
      >
        About
      </nuxt-link>
      <nuxt-link
        class="menu__item"
        to="/submit-a-story"
      >
        Submit story
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

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
};
</script>

<style>
.main-menu {
  display: flex;
  justify-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: auto;
  z-index: 2;
}

.main-menu__section {
  flex: 1 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  min-height: 3rem;
}

.main-menu__section--logo {
  font-size: .9rem;
  font-weight: bold;
  line-height: 1.2;
}

@media (min-width: 600px) {
  .main-menu__section--logo {
    font-size: 1.3rem;
  }
}

.main-menu__section--navigation {
  justify-content: flex-end;
  font-size: .75rem;
  font-weight: bold;
  text-transform: uppercase;
}

@media (min-width: 600px) {
  .main-menu__section--navigation {
    font-size: .875rem;
  }
}

.menu__item {
  flex: 0 0 auto;
  padding: .5rem;
  text-decoration: none;
  z-index: 2;
}

.main-menu--dark {
  background-color: var(--ui--black);
}

.main-menu--light {
  background-color: var(--ui--white);
}

.main-menu--light .menu__item,
.main-menu--light .menu__item:hover,
.main-menu--light .main-menu__section--logo .menu__item,
.main-menu--light .main-menu__section--logo .menu__item:hover {
  color: var(--ui--black-almost);
}

.main-menu--dark .menu__item,
.main-menu--dark .menu__item:hover {
  color: var(--ui--white);
}

.main-menu--dark .main-menu__section--logo .menu__item,
.main-menu--dark .main-menu__section--logo .menu__item:hover {
  color: var(--ui--blue--light);
}
</style>
