<template>
  <dl class="theme-switch">
    <template v-for="(theme, index) in themes">
        <template v-if="(theme.slug === activeSlug)">
          <dt :key="`${theme.slug}-title`">
            <nuxt-link
              to="/"
              class="theme-switch__button"
              :class="`theme-switch__button-${theme.slug} theme-switch__button-${theme.slug}--active`"
            >
              <span class="theme-switch__icon">
                <img
                  class="theme-switch__img"
                  :src="`/assets/${theme.slug}.png`"
                />
              </span>
              <span class="theme-switch__title">{{ theme.title }}</span>
            </nuxt-link>
          </dt>
          <dd class="invert theme-switch__description" :key="`${theme.slug}-active-description`" v-html="formattedBodies[index]"></dd>
        </template>
        <dt
          v-else
          :key="`${theme.slug}-title`"
        >
          <nuxt-link
            :to="theme.path"
            class="theme-switch__button theme-switch__button--inactive"
            :class="`theme-switch__button-${theme.slug}`"
          >
            <span class="theme-switch__icon">
              <img
                class="theme-switch__img"
                :src="`/assets/${theme.slug}.png`"
              />
            </span>
            <span class="theme-switch__title">{{ theme.title }}</span>
          </nuxt-link>
        </dt>
        <dd class="sr-only invert theme-switch__description" :key="`${theme.slug}-sr-description`" v-html="formattedBodies[index]"></dd>
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
@import '../typography/typography.css';
@import '../colors/colors.css';

.theme-switch {
  position: relative;
  z-index: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0 0 1.5rem 0;
  justify-content: center;
}
.theme-switch__button {
  position: relative;
  display: block;
  padding: 0.375rem;
  margin: 0 0.25rem;
  line-height: 1.75rem;
  font-size: 0.65rem;
  background-color: rgba(255,255,255,0.25);
  border-radius: 2.5rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  transition: all 200ms ease-in-out;
  z-index: 2;
}
.theme-switch__button--inactive:hover {
  background-color: rgba(255,255,255,0.5);
}
.theme-switch__button:hover {
  box-shadow: 0px 0px 50px 0px rgba(152, 171, 186, 0.75);
}
.theme-switch__button:focus {
  box-shadow: 0px 0px 0px 3px rgba(152, 171, 186, 1);
}
.theme-switch__button-too-much--active {
  background-color: var(--ui--bg--theme-too-much-trans);
}
.theme-switch__button-too-little--active {
  background-color: var(--ui--bg--theme-too-little-trans);
}
.theme-switch__button-too-dirty--active {
  background-color: var(--ui--bg--theme-too-dirty-trans);
}
.theme-switch__icon {
  display: inline-block;
  vertical-align: bottom;
  width: 1.75rem;
  height: 1.75rem;
}
.theme-switch__img {
  max-width: 100%;
}
.theme-switch__title {
  font-weight: 500;
  color: var(--ui--white);
  display: inline-block;
  margin: 0 0.25rem;
}
.theme-switch__description {
  width: 9.375rem;
  font-size: 0.75rem;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0 0.5rem;
  z-index: 1;
  display: none;
}
@media (min-width: 600px) {
  .theme-switch {
    padding: 0 0 2rem 0;
  }
  .theme-switch__button {
    padding: 0.5rem;
    margin: 0 0.75rem;
    font-size: 1rem;
    line-height: 2.5rem;
    border-radius: 3.4rem;
  }
  .theme-switch__icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  .theme-switch__title {
    margin: 0 0.5rem;
    min-width: 4.5rem;
    text-align: left;
  }
}
@media (min-width: 860px) {
  .theme-switch__description {
    display: block;
  }
}
</style>
