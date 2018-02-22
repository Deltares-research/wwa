<template>
  <aside class="page-aside">
    <section v-if="storyteller" class="page-aside__section page-aside__section--storyteller">
      <h3 class="page-aside__title">Storyteller</h3>
      <avatar-component
        v-bind:img="storyteller.avatar"
        v-bind:name="storyteller.name"
        />
    </section>

    <section v-if="theme" class="page-aside__section age-aside__section--theme">
      <h3 class="page-aside__title">Theme</h3>
        <img v-if="theme && theme.slug" class="theme-icon" v-bind:src="`/assets/${theme.slug}.svg`" />
        {{ theme.title }}
      </section>

    <section class="page-aside__section page-aside__section--influences"
      v-if="influences">
      <h3 class="page-aside__title">Influences</h3>
      <ul class="list--inline">
        <li v-for="link in influences" v-bind:key="link.slug">
          <nuxt-link v-bind:to="link.path">{{ link.title }}</nuxt-link>
        </li>
      </ul>
    </section>

    <section class="page-aside__section page-aside__section--keywords"
      v-if="keywords">
      <h3 class="page-aside__title">Keywords</h3>
      <ul class="list--inline">
        <li v-for="link in keywords" v-bind:key="link.slug">
          <nuxt-link class="tag" v-bind:to="link.path">{{ link.title }}</nuxt-link>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
import AvatarComponent from '~/components/avatar-component/AvatarComponent'

export default {
  components: {
    AvatarComponent
  },
  props: {
    influences: Array,
    keywords: Array,
    storyteller: Object,
    theme: Object
  }
}
</script>

<style>
@import '../colors/colors.css';
@import '../typography/typography.css';

.page-aside {
  position: sticky;
  background-color: var(--ui--bg--light);
  max-width: 20rem;
  width: 30%;
  flex: 1 0 30%;
  padding: 2rem;
}

.page-aside__section {
  margin-bottom: 1rem;
}

.page-aside__section--keywords .tag {
  font-size: .75rem
}

.page-aside__title {
  text-transform: uppercase;
  color: var(--ui--text);
  margin-bottom: var(--base-size-units);
}


</style>





