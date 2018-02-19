<template>
  <dl class="theme-list">
    <template v-for="(theme, index) in themes">
        <dt v-if="(theme.slug === activeSlug)" v-bind:class="`h3 active ${theme.slug}`" v-bind:key="`${theme.slug}-title`">
          {{ theme.title }}
        </dt>
        <dt v-else v-bind:class="`h3 ${theme.slug}`" v-bind:key="`${theme.slug}-title`">
          <nuxt-link v-bind:to="theme.path">{{ theme.title }}</nuxt-link>
        </dt>
        <dd v-bind:key="`${theme.slug}-description`" v-html="formattedBodies[index]"></dd>
    </template>
  </dl>
</template>

<script>
import marked from 'marked'

export default {
  props: {
    themes: Array,
    activeSlug: String
  },
  computed: {
    formattedBodies () {
      return this.themes.map(theme => marked(theme.body, { sanitize: true }))
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.theme-list {
  padding-left: 1rem;
  padding-bottom: 10rem;
  width: 50vw;
  max-width: 12rem;
  color: var(--ui--text--invert);
}
.theme-list ::selection {
  background-color: var(--ui--black);
}
.theme-list::before {
  content: '';
  position: fixed;
  top:0;
  bottom: 0;
  left:0;
  width:50vw;
  max-width: 14rem;
  background-image: var(--ui--left-gradient);
  z-index: -1;
}
.theme-list a {
  text-decoration: none;
}
.theme-list dt,
.theme-list dd {
  margin: 0;
  padding: 0;
}
.theme-list dd + dt {
  margin-top: 1rem;
}
.theme-list dt:not(.active) + dd {
  display: none;
}
.theme-list dt::after {
  content:'';
  display: block;
  height: .25rem;
  width: 12rem;
  margin: .2rem 0 1rem 0;
}
.theme-list dt.too-dirty::after {
  background-image: var(--too-dirty--gradient);
}
.theme-list dt.too-little::after {
  background-image: var(--too-little--gradient);
}
.theme-list dt.too-much::after {
  background-image: var(--too-much--gradient);
}
/* sources are at the end and should be oblique */
.theme-list dd P:last-child:not(:first-child) {
  font-style: italic;
}
</style>
