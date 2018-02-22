<template>
  <aside class="page-aside">
    <section v-if="storyteller" class="page-aside__section page-aside__section--storyteller">
      <h3 class="page-aside__title">Storyteller</h3>
      <img v-bind:src="avatarSrc">
      <p>{{ storyteller.name }}</p>
    </section>

    <section v-if="theme" class="page-aside__section">
      <h3 class="page-aside__title">Theme</h3>
      <img v-if="theme && theme.slug" class="theme-icon" v-bind:src="`/assets/${theme.slug}.svg`" />
      <p>{{ theme.title }}</p>
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
import _defaultAvatarSrc from './assets/Portrait_Placeholder.png'

export default {
  props: {
    influences: Array,
    keywords: Array,
    storyteller: Object,
    theme: Object
  },
  computed: {
    avatarSrc: function () {
      var src = _defaultAvatarSrc
      const avatar = this.storyteller.avatar
      if (avatar && avatar.imgixHost) {
        src = avatar.imgixHost + avatar.value.path
      }
      return src
    }
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
  overflow: auto;
}

.page-aside__section--keywords .tag {
  font-size: .75rem
}

.page-aside__title {
  text-transform: uppercase;
  color: var(--ui--text);
  margin-bottom: var(--base-size-units);
}

.page-aside img {
  float: left;
  width: 3rem;
  height: 3rem;
  vertical-align: top;
  margin-right: .7rem;
}

.page-aside__section--storyteller img {
  border-radius: 100%;
}

.page-aside img + p {
  vertical-align: top;
  padding-top: .7rem;
}
</style>





