<template>
  <nav :class="[`main-menu main-menu--${variant}`, { 'main-menu--transparent' : navBackgroundTrans }]">
    <div class="main-menu__container">
      <div class="main-menu__section main-menu__section--no-padding">
        <nuxt-link :class="`menu__item menu__item--home ${(variant === 'light') ? 'menu__item--dark-background' : ''}`" to="/" title="Go home">
          <span class="sr-only">Return to the homepage</span>
          <span class="main-menu__go-home-text">World Water<br/>Atlas</span>
        </nuxt-link>
      </div>
      <div class="main-menu__section main-menu__section--align-right">
        <nuxt-link :class="`menu__item menu__item--about h3 ${(variant === 'dark') ? 'invert' : ''}`"
          to="/about">
          About
        </nuxt-link>
        <nuxt-link :class="`menu__item menu__item--submit h3 ${(variant === 'dark') ? 'invert' : ''}`"
          to="/submit-a-story">
          Submit a story
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    variant: {
      type: String,
      validator (val) {
        return (val === 'dark' || val === 'light')
      },
      default () {
        return 'dark'
      }
    }
  },
  computed: {
    ...mapState(['navBackgroundTrans'])
  }
}
</script>

<style>
.main-menu {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: auto;
  color: var(--ui--white);
  z-index: 2;
}

.main-menu__section {
  flex: 1 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  min-height: 3rem;
}

.main-menu__section--no-padding {
  padding: 0;
}

.main-menu__section--align-right {
  justify-content: flex-end;
}

.main-menu__container {
  position: relative;
  display: flex;
  justify-items: center;
}

.main-menu--dark {
  background-color: var(--ui--blue);
}

.main-menu--light {
  color: var(--ui--black);
  background-color: var(--ui--white--trans);
}

.main-menu--transparent {
  background: transparent;
}

.main-menu__go-home-text {
  display: inline-block;
}

.menu__item {
  display: inline-block;
  padding: .5rem;
  transition: .5s opacity;
  text-decoration: none;
  color: inherit;
  z-index: 2;
}

.menu__item--margin {
  margin: 0 .5rem;
}

.menu__item--display-block {
  display: block;
}

.menu__item .nuxt-link-active {
  text-decoration: none;
}

.menu__item:hover,
.menu__item:focus,
.menu__item:active {
  text-decoration: none;
  opacity: 1;
}
.menu__item--home {
  text-decoration: none;
  text-align: left;
  left:0;
  top: 0;
  margin: 0;
  padding: 0.5em;
  z-index: 100;
  font-size: 1.375em;
  line-height: 1.15;
  font-weight: 600;
  opacity: 1;
  color: var(--ui--white);
}
.menu__item--dark-background,
.menu__item--dark-background:hover {
  background-color: var(--ui--black--trans);
  color: var(--ui--white);
}

@media (max-width: 799px) {
  .main-menu__section--align-right {
    display: none;
  }
  .menu__item--home {
    display: none;
  }
}

.menu__item--submit {
  outline: 1px solid var(--ui--white);
}
.menu__item--submit::before {
  content: '+ '
}
</style>
