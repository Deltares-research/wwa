<template>
  <div>
    <button
        class="mobile-menu__toggle"
        :class="`mobile-menu__toggle--${variant}`"
        @click="showMobileMenu = true"
      >
        <span class="sr-only">Open main menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
    </button>
    <nav
      class="mobile-menu"
      :class="{ 'mobile-menu--open': showMobileMenu }"
    >
      <button
        class="mobile-menu__close"
        @click="showMobileMenu = false"
      >
        <span class="sr-only">Close slide menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
      <ul class="mobile-menu__list">
        <li class="mobile-menu__list-item">
          <nuxt-link
            class="menu__item menu__item--about menu__item--margin h3"
            to="/"
            @click.native="showMobileMenu = false"
          >
            Home
          </nuxt-link>
        <li class="mobile-menu__list-item">
          <nuxt-link
            class="menu__item menu__item--display-block menu__item--submit h3"
            to="/submit-a-story"
            @click.native="showMobileMenu = false"
          >
            Submit a story
          </nuxt-link>
        </li>
        <li class="mobile-menu__list-item">
          <nuxt-link
            class="menu__item menu__item--display-block menu__item--about h3"
            to="/about"
            @click.native="showMobileMenu = false"
          >
            About
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div
      class="mobile-menu__backdrop"
      :class="{ 'mobile-menu__backdrop--active': showMobileMenu }"
      @click="showMobileMenu = false"
    >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showMobileMenu: false
  }),
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
  }
}
</script>

<style>
@import '../colors/colors.css';

.mobile-menu__toggle {
  display: inline-block;
  padding: 0.5rem;
  line-height: 1em;
  font-size: 1em;
  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  z-index: 2;
  top: 0.75rem;
  left: 0.5rem;
}

.mobile-menu__toggle--light {
  background-color: var(--ui--black--trans)
}

.mobile-menu {
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(-200px);
  height: 100%;
	overflow-y: scroll;
	overflow-x: visible;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
	z-index: 3;
}

.mobile-menu__list {
  list-style: none;
  margin: 0;
  padding: 4rem 0 1rem 0;
  box-shadow: -8px 0 8px rgba(0,0,0,.5);
  min-height: 100%;
  width: 200px;
  background: var(--ui--blue);
  box-sizing: border-box;
}

.mobile-menu__list-item {
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  color: var(--ui--white);
}

.mobile-menu__close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 18px 1rem 19px 1rem;
  z-index: 2;
  border: none;
  background: none;
  cursor: pointer;
}

.mobile-menu--open {
  transform: translateX(0px);
  outline: none;
  box-shadow: 3px 0 12px rgba(0,0,0,.25);
}

.mobile-menu__backdrop--active {
  position: fixed;
  display: block;
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0,0,0,.5);
  cursor: default;
}

@media (min-width: 768px) {
  .mobile-menu,
  .mobile-menu__backdrop,
  .mobile-menu__backdrop--active,
  .mobile-menu__toggle,
  .mobile-menu__close {
    display: none;
  }
}
</style>
