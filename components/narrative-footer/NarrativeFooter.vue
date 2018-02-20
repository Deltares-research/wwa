<template>
    <footer class="narrative-footer">
      <p class="narrative-footer__link previous">
        <nuxt-link v-if="prevchapter" v-bind:to="prevchapter.path" class="h2 previous">
          <span class="sr-only">Read more</span> {{prevchapter.title}}
        </nuxt-link>
        <nuxt-link v-if="nextchapter" v-bind:to="nextchapter.path" class="h2 next">
          <span class="sr-only">Read more</span> {{nextchapter.title}}
        </nuxt-link>
      </p>
    </footer>
</template>

<script>
export default {
  props: {
    prevchapter: {
      type: Object,
      required: true
    },
    nextchapter: {
      type: Object,
      required: false
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.narrative-footer {
  width: 100%;
}

.narrative-footer__link {
  max-width: 940px;
  margin: 0 auto 2rem auto;
}

a.previous {
  float:left;
  margin-left: 1.5rem;
}

a.next {
  float:right;
  margin-right: -1rem;
}

.narrative-footer__link a {
  color: var(--ui--text);
  text-decoration: none;
  transition: .2s color;
  max-width: 480px;
  display:inline-block;
}

.narrative-footer__link a:hover {
  color: var(--ui--text--invert);
}

a.previous::before {
  content: '❮';
  margin-left: -1.5rem;
  position: absolute;
}

a.next::after {
  content: '❯';
  margin-right: 1rem;
}
</style>
