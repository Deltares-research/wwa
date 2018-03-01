<template>
  <aside class="page-aside">
    <section v-if="storyteller" class="clearfix page-aside__section page-aside__section--storyteller">
      <h3 class="page-aside__title">Storyteller</h3>
      <div class="page-aside__avatar-container">
        <img v-bind:src="avatarSrc" v-bind:width="avatarSize.w" v-bind:height="avatarSize.h">
      </div>
      <p>{{ storyteller.name }}</p>
    </section>

    <section v-if="partner && partner.name" class="clearfix page-aside__section page-aside__section--partner">
      <h3 class="page-aside__title">Partner</h3>
      <img v-bind:src="partnerSrc" v-bind:width="logoSize.w" v-bind:height="logoSize.h">
      <p>{{ partner.name }}</p>
    </section>

    <section v-if="theme" class="clearfix page-aside__section">
      <h3 class="page-aside__title">Theme</h3>
      <img v-if="theme && theme.slug" class="theme-icon" v-bind:src="themeSrc" />
      <p>{{ theme.title }}</p>
    </section>

    <section class="page-aside__section page-aside__section--influences"
      v-if="influences.length">
      <h3 class="page-aside__title">Influences</h3>
      <ul class="list--inline">
        <li v-for="link in influences" v-bind:key="link.slug">
          <nuxt-link v-bind:to="link.path">{{ link.title }}</nuxt-link>
        </li>
      </ul>
    </section>

    <section class="page-aside__section page-aside__section--keywords"
      v-if="keywords.length">
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

const sizeLimit = 4 * 20
const imgScale = function (imgObj) {
  const ratio = Math.min(sizeLimit / imgObj.value.width, sizeLimit / imgObj.value.height)
  return { h: Math.round(imgObj.value.height * ratio), w: Math.round(imgObj.value.width * ratio) }
}
const avatarResize = function (imgObj) {
  if (!imgObj || !imgObj.value.height) {
    return { w: sizeLimit, h: sizeLimit }
  }
  const offset = sizeLimit / imgObj.value.height
  return { w: Math.round(imgObj.value.width * offset), h: sizeLimit }
}

export default {
  props: {
    influences: Array,
    keywords: Array,
    storyteller: Object,
    partner: Object,
    theme: Object
  },
  computed: {
    avatarSrc: function () {
      var src = _defaultAvatarSrc
      const avatar = this.storyteller.avatar
      if (avatar && avatar.imgixHost) {
        src = `${avatar.imgixHost}${avatar.value.path}?w=50&q=65`
      }
      return src
    },
    partnerSrc: function () {
      const partner = this.partner.logo
      if (partner && partner.imgixHost) {
        return `${partner.imgixHost}${partner.value.path}?w=50&q=65`
      }
      return null
    },
    themeSrc: function () {
      return `${this.$router.options.base}assets/${this.theme.slug}.svg`
    },
    avatarSize: function () {
      return avatarResize(this.storyteller.avatar)
    },
    logoSize: function () {
      return imgScale(this.partner.logo)
    }
  }
}
</script>

<style>
@import '../colors/colors.css';
@import '../typography/typography.css';

.clearfix:after {
	content: "";
	display: table;
	clear: both;
}

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

.page-aside img {
  float: left;
  vertical-align: top;
  margin-right: .7rem;
  margin-left: -1px;
}

.page-aside__avatar-container img{
  margin:auto
}

.page-aside__avatar-container {
  text-align: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  margin: 0 .7rem 0 -1px;
  display: inline-block;
  overflow: hidden;
}

.page-aside img + p {
  vertical-align: top;
  padding-top: .7rem;
}
</style>





