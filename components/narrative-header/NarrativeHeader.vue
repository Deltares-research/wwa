<template>
  <header class="narrative-header" :class="{'narrative-header--condensed': condensed}">
    <div class="narrative-header__content">
      <img class="narrative-header__cover" :src="coverPath" />
      <h1 class="narrative-header__title">
        {{ chapter.title }}
      </h1>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    chapter: {
      type: Object,
      required: false
    },
    condensed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    coverPath () {
      return this.chapter && this.chapter.cover
        ? `${this.chapter.cover.imgixHost}${this.chapter.cover.value.path}`
        : ''
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

:root {
  --narrative-header-logo-size: 120px; /* temporary until the logo is removed */
  --narrative-header-expanded-height: 15rem;
  --narrative-header-transition-speed: 0.30s;
  --narrative-header-transition-timing-hide: cubic-bezier(0.83, 0, 0.73, 1);
  --narrative-header-transition-timing-reveal: cubic-bezier(0.17, 0, 0.27, 1);
}

.narrative-header__content {
  background-color: var(--ui-light-grey);
  height: calc(var(--narrative-header-expanded-height) - var(--narrative-header-logo-size));
  display: flex;
  align-items: flex-start;
  padding: 20px;
  padding-top: var(--narrative-header-logo-size);
  position: relative;
  text-shadow: 0 0 2rem var(--ui--black--trans);
  z-index: 0;
  transition: transform var(--narrative-header-transition-speed) var(--narrative-header-transition-timing-hide);
}

.narrative-header__content:before {
  content: '';
  background-image: linear-gradient(to bottom, var(--ui--bg--dark-transparent), var(--ui--bg--dark-translucent));
  position: absolute;
  top: 25%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 1;
  transition: opacity var(--narrative-header-transition-speed) var(--narrative-header-transition-timing-hide);
}

.narrative-header__title {
  color: var(--ui--text--invert);
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  transition: color var(--narrative-header-transition-speed) var(--narrative-header-transition-timing-hide),
    transform var(--narrative-header-transition-speed) var(--narrative-header-transition-timing-hide);
}

.narrative-header__cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -2;
  opacity: 1;
  transition: opacity var(--narrative-header-transition-speed) var(--narrative-header-transition-timing-hide);
}

.narrative-header--condensed .narrative-header__content {
  text-shadow: none;
  transform: translateY(-78%);
  align-items: flex-end;
  transition-timing-function: var(--narrative-header-transition-timing-reveal);
}

.narrative-header--condensed .narrative-header__title {
  --size-tweak: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100vw - (var(--size-tweak) * 2) - var(--narrative-header-logo-size));
  font-size: 1rem;
  color: var(--ui-black);
  transform: translateX(calc(var(--narrative-header-logo-size) - var(--size-tweak)));
}

.narrative-header--condensed .narrative-header__content:before {
  opacity: 0;
  transition-timing-function: var(--narrative-header-transition-timing-reveal);
}

.narrative-header--condensed .narrative-header__content .narrative-header__cover {
  opacity: 0;
  transition-timing-function: var(--narrative-header-transition-timing-reveal);
}

@media (min-width: 1100px) {
  .narrative-header--condensed .narrative-header__title {
    transform: translateX(calc(var(--narrative-header-logo-size) / 2));
  }
}

@media (min-width: 1200px) {
  .narrative-header--condensed .narrative-header__title {
    transform: none;
  }
}
</style>
