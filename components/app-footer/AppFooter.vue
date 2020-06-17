<template>
  <footer class="app-footer layout-section">
    <div class="app-footer__content layout-section__container">
      <a
        class="app-footer__logo"
        href="/"
      >
        Explore <span class="app-footer__logo-highlight">World Water Atlas</span>
      </a>

      <nav class="app-footer__navigation">
        <ul class="list--inline">
          <li class="app-footer__primary-link-item">
            <nuxt-link
              to="/events"
              class="app-footer__link"
            >
              Events
            </nuxt-link>
          </li>
          <li class="app-footer__primary-link-item">
            <nuxt-link
              to="/about"
              class="app-footer__link"
            >
              About
            </nuxt-link>
          </li>
          <li class="app-footer__primary-link-item app-footer__primary-link-item--divider">
            <nuxt-link
              to="/submit-a-story"
              class="app-footer__link"
            >
              Submit story
            </nuxt-link>
          </li>
          <li
            v-for="link in footerLinks"
            :key="link.slug"
            class="app-footer__secondary-link-item"
          >
            <nuxt-link
              :to="`/${link.slug}`"
              class="app-footer__link"
            >
              {{ link.title }}
            </nuxt-link>
          </li>
        </ul>
      </nav>

      <div
        v-once
        class="app-footer__copyright"
      >
        &copy; {{ currentYear }} World Water Atlas
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    ...mapState(['footerLinks']),
  },
};
</script>

<style>
.app-footer {
  padding-top: 2rem;
}

.app-footer__content {
  padding: 2rem 0;
  border-top: 1px solid var(--white);
}

.app-footer__logo {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  text-decoration: none;
}

.app-footer__logo-highlight {
  color: var(--tertiary-blue);
}

@media (min-width: 600px) {
  .app-footer__logo-highlight {
    display: block;
  }
}

.app-footer__navigation {
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: bold;
}

li.app-footer__primary-link-item {
  display: inline;
  text-transform: uppercase;
}

li.app-footer__primary-link-item--divider {
  margin-bottom: .25rem;
}

li.app-footer__primary-link-item--divider:after {
  content: "\A";
  white-space: pre;
}

li.app-footer__secondary-link-item {
  display: inline;
  font-size: .875rem;
}

.app-footer__link {
  text-decoration: none;
}

.app-footer__copyright {
  color: var(--grey--light);
}
</style>
