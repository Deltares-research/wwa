<template>
  <nav class="scroll-indicator">
    <ul>
      <li class="to-top">
        <nuxt-link to="#top">
          <span class="scroll-indicator__label sr-only">Back to top</span>
        </nuxt-link>
      </li>
      <li
        v-for="(page, index) in pages"
        :key="`${page.slug}-${index}`"
        :class="`${(activePage && page.slug === activePage.slug) ? 'active' : ''}`"
      >
        <nuxt-link
          :to="`#${page.slug}`"
          :title="page.title"
        >
          <span class="scroll-indicator__label sr-only">{{ page.title }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    activePage: {
      type: Object,
    },
    pages: {
      validator (pages) {
        return pages.every(page => (page.slug && page.title));
      },
    },
  },
  watch: {
    '$route' (to, from) {
      if ((to.path === from.path) && (to.hash === '#top')) {
        window.scrollTo(0, 0);
      }
    },
  },
};
</script>

<style>
.scroll-indicator {
  display: none;
}

@media screen and (min-width: 720px) {
  .scroll-indicator {
    display: flex;
    position: fixed;
    top: 10%;
    bottom: 10%;
    right: 0;
    align-items: center;
    z-index: 100;
  }
}

.scroll-indicator ul {
  width: 2rem;
  text-align: right;
  margin: 0;
  padding: 0;
  height: auto;
}
.scroll-indicator li {
  opacity: .6;
  color: var(--white);
  list-style: none;
  margin: .75rem 0rem;
  padding: 0;
}
.scroll-indicator li.active {
  opacity: 1;
}
.scroll-indicator a {
  display: inline-block;
  width: 2rem;
  height: 1rem;
}
.scroll-indicator a::before {
  content: '';
  display: inline-block;
  width: .5rem;
  height: .5rem;
  border-radius: .5rem;
  margin-right: .75rem;
  background-color: var(--white);
}
.scroll-indicator .to-top a::before {
  background-color: transparent;
  content: '▲';
  font-size: 1rem;
  text-align:center;
  position: relative;
  top: -.125rem;
  left: -.25rem;
}
</style>
