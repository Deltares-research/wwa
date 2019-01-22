<template>
  <div class="menu">
    <nav :class="[`main-menu main-menu--${variant}`, { 'main-menu--transparent' : navBackgroundTrans }]">
      <div class="main-menu__container">
        <div class="main-menu__section main-menu__section--no-padding">
          <nuxt-link :class="`menu__item menu__item--home ${(variant === 'light') ? 'menu__item--dark-background' : ''}`" to="/" title="Go home">
            <span class="main-menu__go-home-icon">
              <svg width="32" height="32" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z" fill="#fff"/>
              </svg>
            </span>
            <span class="sr-only">Return to the homepage</span>
            <span class="main-menu__go-home-text">World Water<br/>Atlas</span>
          </nuxt-link>
        </div>
        <div class="main-menu__section main-menu__section--align-center">
          <portal-target name="menu-center-content" />
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
    <mobile-menu
      :variant="variant"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MobileMenu from '~/components/mobile-menu/MobileMenu'

export default {
  components: { MobileMenu },
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
@import '../colors/colors.css';

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

.main-menu__section--align-center {
  justify-content: center;
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

.main-menu__go-home-icon {
  display: inline-block;
  padding: 6px;
}

.menu__item {
  display: inline-block;
  padding: .5rem;
  transition: .5s opacity;
  font-weight: normal;
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

/*
* style rules for a minimal print layout
*/

@media print {
  .menu {
    display: none;
  }
}
</style>
