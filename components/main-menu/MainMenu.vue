<template>
  <div class="menu">
    <nav :class="[`main-menu main-menu--${variant}`, { 'main-menu--transparent' : navBackgroundTrans }]">
      <div class="main-menu__container">
        <button class="main-menu__back" @click="onBack" v-if="backButton !== undefined">
          <svg v-if="backButton === 'arrow'" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24" fill="#fff">
            <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
          </svg>
          <span
            :class="`menu__item h3 ${(variant === 'dark') ? 'invert' : ''} ${(backButton === 'arrow') ? 'sr-only': ''}`">
            {{ backButton }}
          </span>
        </button>
        <div class="main-menu__section main-menu__section--no-padding">
          <nuxt-link :class="`menu__item menu__item--home ${(variant === 'light') ? 'menu__item--dark-background' : ''}`" to="/" title="Go home">
            <span class="sr-only">Return to the homepage</span>
            <span v-if="backButton" class="main-menu__go-home-text">Home</span>
            <span v-else class="main-menu__go-home-text">World Water<br/>Atlas</span>
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
    },
    backButton: {
      type: String,
      default: undefined
    }
  },
  computed: {
    ...mapState(['navBackgroundTrans'])
  },
  methods: {
    onBack () {
      window.history.go(-1)
    }
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

.main-menu__back {
  padding: 0.5rem;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 2.5rem;
  transform: translateY(-50%);
  display: none;
  background-color: transparent;
  border: none;
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
  .main-menu__back {
    display: block;
  }
  .main-menu__section--no-padding {
    display: none;
  }
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
