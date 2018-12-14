<template>
  <dl class="theme-switch">
    <template v-for="theme in themes">
        <dt
          v-if="(theme.slug === activeSlug)"
          :key="`${theme.slug}-title`"
        >
          <button
            class="theme-switch__button"
            :class="`theme-switch__button-${theme.slug} theme-switch__button-${theme.slug}--active`"
            disabled
          >
            <span class="theme-switch__icon">
              <img
                class="theme-switch__img"
                :src="`/assets/${theme.slug}.png`"
              />
            </span>
            <span class="theme-switch__title">{{ theme.title }}</span>
          </button>
        </dt>
        <dt
          v-else
          :key="`${theme.slug}-title`"
        >
          <nuxt-link
            :to="theme.path"
            class="theme-switch__button"
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
        <!-- <dd class="invert theme-switch__description" :key="`${theme.slug}-description`" v-html="formattedBodies[index]"></dd> -->
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
  width: 100vw;
  display: flex;
  flex-direction: row;
  margin: 0 0 1.5rem 0;
  justify-content: center;
}
.theme-switch__button {
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
@media (min-width: 600px) {
  .theme-switch {
    margin: 0 0 2rem 0;
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
.theme-switch__description {
  background: red;
}
</style>
