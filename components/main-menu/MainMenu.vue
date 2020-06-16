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

    <div class="main-menu__section main-menu__description">
      {{ description }}
    </div>

    <ul class="main-menu__section main-menu__navigation list--inline">
      <li class="main-menu__navigation-item">
        <nuxt-link
          class="main-menu__navigation-link"
          to="/events"
        >
          Events
        </nuxt-link>
      </li>
      <li class="main-menu__navigation-item">
        <nuxt-link
          class="main-menu__navigation-link"
          to="/about"
        >
          About
        </nuxt-link>
      </li>
      <li class="main-menu__navigation-item">
        <nuxt-link
          class="main-menu__navigation-link"
          to="/submit-a-story"
        >
          Submit story
        </nuxt-link>
      </li>
    </ul>
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
  computed: {
    ...mapState(['description']),
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
  z-index: 2;
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

@media (min-width: 600px) {
  .main-menu__logo {
    font-size: 1.3rem;
  }
}

.main-menu__description {
  flex: 0 1 300px;
  padding-top: 0;
  padding-bottom: 0;
  align-self: center;
  border-left: 2px solid var(--ui--orange);
  font-size: .875rem;
}

@media (max-width: 599px) {
  .main-menu__description {
    display: block;
    position: absolute;
    margin-left: 0;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 290px;
    font-size: 1rem;
    font-weight: bold;
  }
}

@media (min-width: 768px) {
  .main-menu__description {
    margin-left: 2rem;
    margin-right: auto;
  }
}

.main-menu__navigation {
  justify-content: flex-end;
  flex-wrap: wrap;
  font-size: .75rem;
  font-weight: bold;
  text-transform: uppercase;
}

@media (min-width: 600px) {
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
  background-color: var(--ui--black);
}

.main-menu--light {
  background-color: var(--ui--white);
}

.main-menu--light .main-menu__navigation-link,
.main-menu--light .main-menu__navigation-link:hover,
.main-menu--light .main-menu__logo .main-menu__navigation-link,
.main-menu--light .main-menu__logo .main-menu__navigation-link:hover {
  color: var(--ui--black-almost);
}

.main-menu--dark .main-menu__navigation-link,
.main-menu--dark .main-menu__navigation-link:hover {
  color: var(--ui--white);
}

.main-menu--dark .main-menu__logo .main-menu__navigation-link,
.main-menu--dark .main-menu__logo .main-menu__navigation-link:hover {
  color: var(--ui--blue--light);
}
</style>
