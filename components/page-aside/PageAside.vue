<template>
  <aside class="page-aside">
    <section v-if="storyteller && storyteller.name" class="clearfix page-aside__section page-aside__section--storyteller">
      <h3 class="page-aside__title">Storyteller</h3>
      <span v-if="storyteller.avatar && storyteller.avatar.imgixHost" class="page-aside__avatar-container">
        <img v-bind:src="`${storyteller.avatar.imgixHost}${storyteller.avatar.value.path}?w=scaleMinToSize(storyteller.avatar, sizeLimit).w&q=65`" v-bind:width="scaleMinToSize(storyteller.avatar, sizeLimit).w" v-bind:height="scaleMinToSize(storyteller.avatar, sizeLimit).h">
      </span>
      <p>{{ storyteller.name }}</p>
    </section>

   <section v-if="theme" class="clearfix page-aside__section">
      <h3 class="page-aside__title">Theme</h3>
      <img v-if="theme && theme.slug" class="theme-icon" v-bind:src="`/assets/${this.theme.slug}.svg`" />
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
export default {
  props: {
    influences: Array,
    keywords: Array,
    storyteller: Object,
    partner: Object,
    theme: Object,
    sizeLimit: {
      type: Number,
      default: 4 * 16
    }
  },
  methods: {
    scaleMinToSize: function (imgObj, sizeLimit) {
      if (!imgObj.value.width) {
        return { h: Math.round(sizeLimit), w: Math.round(sizeLimit) }
      }
      if (imgObj.value.height > imgObj.value.width) {
        const offset = sizeLimit / imgObj.value.width
        return { w: sizeLimit, h: Math.round(imgObj.value.height * offset) }
      } else {
        const offset = sizeLimit / imgObj.value.height
        return { w: Math.round(imgObj.value.width * offset), h: sizeLimit }
      }
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
