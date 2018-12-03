<template>
  <nav class="narrative-footer">
    <nuxt-link v-if="previousLink" :to="previousLink.path" class="h2 narrative-footer__link" :title="previousLink.title">
      <span class="sr-only">Continue reading about</span> {{ previousLink.title }}
    </nuxt-link>
    <nuxt-link v-if="nextLink" :to="nextLink.path" class="h2 narrative-footer__link narrative-footer__link--next" :title="nextLink.title">
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
  margin: 2.5rem auto;
  max-width: 40rem;
  display: flex;
  justify-content: center;
}

.narrative-footer__link {
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 1rem;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  transition: 300ms color ease-in-out;
  white-space: nowrap;
  width: 50%;
}

.narrative-footer__link:hover {
  color: var(--or--3-5);
}

.narrative-footer__link::before {
  content: '❮';
  left: 0;
  font-size: 0.5rem;
  position: absolute;
  speak: none;
  top: 8px;
}

.narrative-footer__link--next {
  float: right;
  padding-left: 0;
  padding-right: 1rem;
  text-align: right;
}

.narrative-footer__link--next::before {
  content: '❯';
  right: 0;
  left: auto
}
</style>
