<template>
  <header class="narrative-header__container">
    <div class="narrative-header" :class="{'narrative-header--condensed': condensed}">
      <button class="narrative-header__close-button" @click="goBack">
        <span class="sr-only">Close</span>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 47.971 47.971">
          <path fill="white" d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
        </svg>
      </button>
      <div class="narrative-header__content">
        <img v-if="coverPath" class="narrative-header__cover" :src="coverPath" />
        <button class="narrative-header__back" @click="goBack" v-if="!condensed">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
          </svg>
          back
        </button>
        <h1 class="narrative-header__title">
          {{ chapter.title }}
        </h1>
        <button
          v-if="pages.length > 1"
          class="narrative-header__navigation-toggle"
          @click="setShowNavigation(showNavigation)"
        >
          In this chapter
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="narrative-header__toggle-icon" :class="{'narrative-header__toggle-icon--active': displayNavigationList}">
            <path d="M7 10l5 5 5-5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
        <nav
          v-if="pages.length > 1"
          class="narrative-header__navigation"
          :class="{'narrative-header__navigation--show': displayNavigationList}"
        >
          <ol class="narrative-header__navigation-list">
            <li
              class="narrative-header__navigation-item"
              :class="{'narrative-header__navigation-item--active': page.slug === activePage}"
              v-for="(page, index) in pages"
              :key="`${page.slug}-${index}`"
              @click="setShowNavigation(showNavigation)"
            >
              <button class="narrative-header__link" @click="$emit('selectLink', page.slug)" >
                <span class="narrative-header__link-index" >{{ index+1 }}.</span>&nbsp;&nbsp;{{ page.title }}
              </button>
            </li>
          </ol>
        </nav>
      </div>
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
    pages: {
      type: Array,
      default: () => []
    },
    condensed: {
      type: Boolean,
      default: false
    },
    activePage: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    showNavigation: false
  }),
  computed: {
    coverPath () {
      return this.chapter && this.chapter.cover
        ? `${this.chapter.cover.imgixHost}${this.chapter.cover.value.path}`
        : ''
    },
    displayNavigationList () {
      return this.showNavigation !== null
        ? this.showNavigation
        : !this.condensed
    }
  },
  methods: {
    setShowNavigation (value) {
      this.showNavigation = value === null
        ? this.condensed
        : !value
    },
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

:root {
  --narrative-header-transition-speed: 300ms;
  --narrative-header-transition-timing-hide: cubic-bezier(0.83, 0, 0.73, 1);
  --narrative-header-transition-timing-reveal: cubic-bezier(0.17, 0, 0.27, 1);
  --narrative-hearder__navigation-toggle-fixed-size: 10rem;
}

.narrative-header__container {
  min-height: 240px;
}

.narrative-header {
  z-index: 2;
}

.narrative-header__content {
  padding: 3.75rem 1.5rem;
  position: relative;
  z-index: 2;
  transition: transform var(--narrative-header-transition-speed) var(--narrative-header-transition-timing-hide);
}

.narrative-header__close-button {
  position: absolute;
  z-index: 5;
  right: 0;
  width: 60px;
  height: 60px;
  padding: 10px;
  margin: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.narrative-header__close-button svg {
  width: 1rem;
  height: 1rem;
}

.narrative-header--condensed .narrative-header__close-button {
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;
  background-color: #467388;
}

@media (min-width: 600px) {
  .narrative-header__content {
    padding: 3.75rem 2.5rem;
  }
}

.narrative-header__content:before {
  content: '';
  background-image: linear-gradient(to bottom, var(--ui--bg--dark-transparent), var(--ui--bg--dark-translucent));
  position: absolute;
  top: 10%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  opacity: 1;
}

.narrative-header__content:after {
  content: '';
  background-color: var(--ui--light-grey);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.narrative-header__title {
  color: var(--ui--text--invert);
  font-size: 1.5rem;
  line-height: 1.75rem;
  min-height: 5.25rem;
  font-weight: bold;
  position: relative;
  z-index: 4;
  margin: 0;
}

.narrative-header__back {
  position: relative;
  z-index: 4;
  color: var(--ui--text--invert);
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.narrative-header__back svg {
  height: 1em;
  width: 1em;
}

@media (min-width: 768px) {
  .narrative-header__title {
    font-size: 2rem;
    line-height: 2.5rem;
    min-height: 7.5rem;
  }
}

.narrative-header__cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: 2;
  opacity: 1;
  transition: opacity var(--narrative-header-transition-speed) var(--narrative-header-transition-timing-hide);
}

.narrative-header__navigation-toggle {
  position: absolute;
  z-index: 5;
  bottom: 0;
  right: 0;
  background-color: #467388;
  color: var(--ui--white);
  border: none;
  padding: 8px 1em;
  line-height: 24px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 50%;
}

.narrative-header__toggle-icon {
  display: inline-block;
  fill: var(--ui--white);
  transition: transform 200ms ease-in-out;
}

.narrative-header__toggle-icon--active {
  transform: rotate(180deg);
}

.narrative-header--condensed .narrative-header__navigation-toggle {
  width: var(--narrative-hearder__navigation-toggle-fixed-size);
  margin-right: 60px;
}

.narrative-header__navigation {
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: var(--ui--white);
  transform: none;
  z-index: 0;
  transition: transform var(--narrative-header-transition-speed) var(--narrative-header-transition-timing-hide);
  padding: 0.5rem 1rem;

  /* we need to restrict the height */
  max-height: 19.5rem;
  overflow: scroll;
}

@media (min-width: 768px) {
  .narrative-header__navigation {
    max-width: 600px;
  }
}

.narrative-header__navigation--show {
  transform: translateY(100%);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

.narrative-header__navigation-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.narrative-header__link {
  padding: 1em 1.5em;
  border-radius: 2em;
  text-decoration: none;
  display: block;
  color: #467388;
  cursor: pointer;
  border: none;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.narrative-header__navigation-item--active .narrative-header__link {
  background-color: #f6f8fa;
  color: #467388;
  font-weight: bold;
}

.narrative-header__link:hover {
  color: #467388;
  text-decoration: underline;
}

.narrative-header__link-index {
  color: #000000;
  font-weight: bold;
}

.narrative-header--condensed {
  max-width: none;
  width: 100vw;
  top: 4rem;
  position: fixed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

@media (min-width: 1024px) {
  .narrative-header--condensed {
    width: 67vw;
  }
}

@media (min-width: 1440px) {
  .narrative-header--condensed {
    width: 50vw;
  }
}


.narrative-header--condensed .narrative-header__content {
  text-shadow: none;
  align-items: flex-end;
  padding: 0.5rem;
}

.narrative-header--condensed .narrative-header__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100vw - 1rem - (var(--narrative-hearder__navigation-toggle-fixed-size)));
  font-size: 1rem;
  color: var(--ui--black);
  min-height: auto;
  font-weight: 500;
  line-height: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.narrative-header--condensed .narrative-header__content:before {
  opacity: 0;
}

.narrative-header--condensed .narrative-header__content .narrative-header__cover {
  opacity: 0;
}

@media print {
  .narrative-header,
  .narrative-header--condensed {
    position: relative;
    top: 0;
  }
  .narrative-header__title,
  .narrative-header__container {
    min-height: auto;
  }
  .narrative-header__content:after {
    background-color: var(--ui--blue);
    -webkit-print-color-adjust: exact;
  }
  .narrative-header__content:before {
    display: none;
  }
  .narrative-header__cover {
    display: none;
  }
  .narrative-header__navigation-toggle {
    display: none;
  }
  .narrative-header__back {
    display: none;
  }
}
</style>
