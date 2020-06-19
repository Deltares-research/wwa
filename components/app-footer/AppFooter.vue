<template>
  <footer
    class="app-footer layout-section"
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
  width: 67vw;
}

.app-footer__content {
  padding: 2rem 0;
  border-top: 1px solid var(--grey--light);
  color: var(--grey--light);
}

.app-footer__logo {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  text-decoration: none;
  color: var(--white);
}

@media (min-width: 600px) {
  .app-footer__logo {
    margin-bottom: 1.5rem;
  }
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

@media (min-width: 600px) {
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
