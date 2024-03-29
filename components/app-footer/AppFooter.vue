<template>
  <footer
    class="app-footer layout-section layout-section--background-black"
    :class="{ 'app-footer--small': isBookChapter }"
  >
    <div class="app-footer__content layout-section__container">
      <a
        class="app-footer__logo"
        href="/"
      >
        Explore <span class="app-footer__logo-highlight">World Water Atlas</span>
      </a>

      <nav class="app-footer__navigation">
        <ul class="app-footer__navigation-main-list list--inline">
          <li
            v-for="link in navigationLinks.mainNavigation"
            :key="link.slug"
            class="app-footer__primary-link-item"
          >
            <nuxt-link
              :to="`/${link.slug}`"
              class="app-footer__link"
            >
              {{ link.title }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="list--inline">
          <li
            v-for="link in navigationLinks.subNavigation"
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

      <div v-once>
        &copy; {{ currentYear }} <span lang="en">World Water Atlas</span>
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
    ...mapState(['navigationLinks']),
    isBookChapter () {
      return this.$route.name === 'narratives-book-chapter';
    },
  },
};
</script>

<style>
.app-footer {
  padding-top: 2rem;
}

.app-footer--small {
  padding: 2rem 1rem 0 1rem;
}

@media (--sm-viewport) {
  .app-footer--small .app-footer__content {
    max-width: 45rem;
  }
}

@media (--lg-viewport) {
  .app-footer--small {
    padding-left: 2rem;
    padding-right: 2rem;
    width: 45rem;
  }
}

.app-footer__content {
  padding: 2rem 0;
  border-top: 1px solid var(--black-tertiary);
  color: var(--black-tertiary);
}

.app-footer__logo {
  display: inline-block;
  margin-bottom: 1rem;
  font-weight: 500;
  line-height: 1.25;
  text-decoration: none;
  color: var(--white);
}

@media (--sm-viewport) {
  .app-footer__logo {
    margin-bottom: 1.5rem;
  }
}

.app-footer__logo-highlight {
  color: var(--blue-tertiary);
}

@media (--sm-viewport) {
  .app-footer__logo-highlight {
    display: block;
  }
}

.app-footer__navigation {
  margin-bottom: 2rem;
  font-weight: bold;
}

@media (--sm-viewport) {
  .app-footer__navigation {
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 0;
    height: 100%;
    text-align: right;
  }
}

.app-footer__navigation-main-list {
  margin-bottom: .25rem;
}

li.app-footer__primary-link-item {
  text-transform: uppercase;
}

li.app-footer__secondary-link-item {
  font-size: .875rem;
}

.app-footer__link {
  text-decoration: none;
}
</style>
