<template>
   <nav v-bind:class="`main-menu main-menu--${variant}`">
     <nuxt-link class="main-menu__item main-menu__item--home h1" to="/" title="Go home">
       <span class="sr-only">Return to the homepage</span>World<br/>Water<br/>Atlas <img alt="" src="/assets/home.png" class="home-icon"/>
      </nuxt-link>
      <nuxt-link v-bind:class="`main-menu__item main-menu__item--about h3 ${(variant === 'dark') ? 'invert' : ''}`"
        to="/about">
        About
      </nuxt-link>
      <nuxt-link v-bind:class="`main-menu__item main-menu__item--submit h3 ${(variant === 'dark') ? 'invert' : ''}`"
        to="/submit-a-story">
        Submit a story
      </nuxt-link>
    </nav>
</template>

<script>
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
  }
}
</script>

<style>
@import '../colors/colors.css';

.main-menu {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 1rem;
  height: auto;
  text-align: right;
  color: var(--ui--white);

}

.main-menu--light {
  color: var(--ui--black);
}

.main-menu__item {
  position: relative;
  display: inline-block;
  margin: 0 .5rem;
  padding: .5rem;
  transition: .5s opacity;
  font-weight: normal;
  text-decoration: none;
  color: inherit;
}

.main-menu__item:hover,
.main-menu__item:focus,
.main-menu__item:active {
  text-decoration: none;
  opacity: 1;
}
.main-menu .main-menu__item--home {
  text-decoration: none;
  font-weight: normal;
  position: fixed;
  text-align: left;
  left:0;
  top: 0;
  margin: 0;
  z-index: 100;
  opacity: 1;
  padding: 1rem;
  color: var(--ui--white);
  background-color: var(--ui--black--trans);
}

.main-menu__item--submit {
  outline: 1px solid var(--ui--white);
}
.main-menu__item--submit::before {
  content: '+ '
}

.main-menu .home-icon {
  width: var(--height-responsive);
  height: var(--height-responsive);
  vertical-align: bottom;
}
</style>
