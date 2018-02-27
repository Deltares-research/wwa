<template>
  <nav class="scroll-indicator">
    <ul>
      <li class="to-top">
      <nuxt-link v-on:click.prevent="toTop()" to="#top">
          <span class="scroll-indicator__label sr-only">Back to top</span>
        </nuxt-link>
      </li>
      <li v-for="page in pages" v-bind:key="page.slug"
        v-bind:class="`${(activePage && page.slug === activePage.slug) ? 'active' : ''}`">
        <nuxt-link v-bind:to="`#${page.slug}`">
          <span class="scroll-indicator__label sr-only">{{ page.title }}</span></nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    activePage: {
      type: Object
    },
    pages: {
      validator (pages) {
        return pages.every(page => (page.slug && page.title))
      }
    }
  },
  methods: {
    toTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.scroll-indicator {
  position: fixed;
  top: 10%;
  bottom: 10%;
  right: 1rem;
  display: flex;
  align-items: center;
  z-index: 100;
}
.scroll-indicator ul {
  width: 2rem;
  border-radius: 1rem;
  background-color: var(--ui--black--trans);
  text-align: right;
  margin: 0;
  padding: 0;
  height: auto;
}
.scroll-indicator li {
  opacity: .6;
  color: var(--ui--white);
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
  background-color: var(--ui--white);
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
.scroll-indicator li:hover .scroll-indicator__label {
  width: 100vw;
  position: absolute;
  right: 2.5rem;
  height: auto;
  visibility: visible;
  overflow: visible;
  clip: unset;
}


</style>
