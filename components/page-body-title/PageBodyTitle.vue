<template>
  <section class="page-body-title">
    <div class="page-body-title__theme">
      <img v-if="theme && theme.slug" class="theme-icon page-body-title__theme-icon" :src="`assets/${theme.slug}.png`" width="48" height="48" />
    </div>

    <div class="page-body-title__storyteller">
      <span v-if="storyteller && storyteller.name">
        {{ storyteller.name }}
      </span>
    </div>

    <h1 class="page-body-title__title">{{ pageTitle }}</h1>

    <div class="page-body-title__keywords" v-if="keywords.length || influences.length">
      <ul class="list--inline">
        <li v-for="link in keywords" :key="link.slug">
          <nuxt-link class="tag" :to="link.path">{{ link.title }}</nuxt-link>
        </li>
        <li v-for="link in influences" :key="link.slug">
          <nuxt-link :to="link.path" :class="`tag tag--influence tag--${link.slug}`">{{ link.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    pageTitle: String,
    influences: Array,
    keywords: Array,
    storyteller: Object,
    partner: Object,
    theme: Object
  }
}
</script>

<style>
@import '../colors/colors.css';
@import '../tag/tag.css';
@import '../typography/typography.css';

.page-body-title__title {
  font-size: 1.5rem;
  line-height: 1.75rem;
  font-weight: bold;

}

@media (min-width: 768px) {
  .page-body-title__title {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}

.page-body-title {
  box-sizing: border-box;
}

.page-body-title__theme {
  position: relative;
  height: 1px;
  margin-top: -1px;
  position: relative;
  margin-bottom: 1rem;
}

.page-body-title__theme-icon {
  position: absolute;
  top: calc(-1*(1.5rem + 24px));
  left: 0;
}

.page-body-title__storyteller {
  font-size: 0.75rem;
  color: #3e677a;
  margin-bottom: 0.5rem;
}

@media only screen and (min-width: 600px) {
  .page-body-title__theme {
    margin-bottom: 0;
  }

  .page-body-title__theme-icon {
    top: 0;
    left: calc(-1*(2.5rem + 24px));
  }

  .page-body-title__storyteller {
    line-height: 48px;
  }
}

/*
* style rules for a minimal print layout
*/

@media print {
  .page-body-title__theme {
    height: auto;
  }
  .page-body-title__theme-icon {
    position: relative;
    top: 0;
  }
}
</style>
