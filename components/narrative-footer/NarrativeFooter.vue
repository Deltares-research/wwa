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
      required: false
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
  background: linear-gradient(rgba(0,0,38,0.8) 35%, rgba(0,51,102,0));
  overflow:hidden;
}

.narrative-footer__link {
  max-width: 940px;
  margin: 1rem auto 2rem auto;
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
  color: var(--ui--text--light);
  text-decoration: none;
  transition: .2s color;
  max-width: 460px;
  display:inline-block;
  line-height: 2rem;
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
