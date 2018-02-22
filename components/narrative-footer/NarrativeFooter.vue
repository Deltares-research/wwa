<template>
  <nav class="narrative-footer clearfix">
    <nuxt-link v-if="previousLink" v-bind:to="previousLink.path" class="h2 narrative-footer__link" v-bind:title="previousLink.title">
      <span class="sr-only">Continue reading about</span> {{ previousLink.title }}
    </nuxt-link>
    <nuxt-link v-if="nextLink" v-bind:to="nextLink.path" class="h2 narrative-footer__link narrative-footer__link--next" v-bind:title="nextLink.title">
      <span class="sr-only">Continue reading about</span> {{ nextLink.title }}
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  props: {
    previousLink: {
      type: Object,
      required: false
    },
    nextLink: {
      type: Object,
      required: false
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.narrative-footer {
  margin: 0 auto 8rem;
  max-width: 60rem;
  padding-top: 1rem;
}

.narrative-footer__link {
  color: var(--ui--text--light);
  float: left;
  max-width: 40%;
  overflow: hidden;
  padding-left: 1rem;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 1px var(--ui--black);
  transition: 300ms color ease-in-out;
  white-space: nowrap;
}

.narrative-footer__link:hover {
  color: var(--ui--text--invert);
}

.narrative-footer__link::before {
  content: '❮';
  left: 0;
  font-size: .8rem;
  position: absolute;
  speak: none;
  top: 8px;
}

.narrative-footer__link--next {
  float: right;
  padding-left: 0;
  padding-right: 1rem;
}

.narrative-footer__link--next::before {
  content: '❯';
  right: 0;
  left: auto
}
</style>
