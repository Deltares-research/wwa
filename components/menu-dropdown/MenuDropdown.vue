<template>
 <div
    class="menu-dropdown"
    @click="showDropdownMenu = !showDropdownMenu"
    v-click-outside="outside"
  >
    <button
      class="menu-dropdown__button"
      :class="{ 'menu-dropdown__button--active': showDropdownMenu }"
    >
      <span class="sr-only">Go to book</span>
      <span class="menu-dropdown__title">{{ book.title }}</span>
      <svg
        class="menu-dropdown__icon"
        :class="{ 'menu-dropdown__icon--active': showDropdownMenu }"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        <path fill="none" d="M0 0h24v24H0V0z"/>
      </svg>
    </button>
    <div class="menu-dropdown__dropdown" :class="{ 'menu-dropdown__dropdown--active': showDropdownMenu }">
      <ul class="menu-dropdown__list">
        <li v-for="bookTitle in booksList" :key="bookTitle.slug" class="menu-dropdown__list-item ">
          <nuxt-link class="menu-dropdown__list-link" :to="bookTitle.path" >{{ bookTitle.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDropdownMenu: false
    }
  },
  props: {
    book: {
      type: Object,
      required: true
    },
    booksList: {
      type: Array,
      required: true
    }
  },
  methods: {
    outside: function (e) {
      this.showDropdownMenu = false
    }
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }

          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },
      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  }
}
</script>

<style>
.menu-dropdown {
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 16rem;
}

@media only screen and (max-width: 320px) {
  .menu-dropdown {
    width: 10em;
  }
}

.menu-dropdown__dropdown {
  position: absolute;
  background: white;
  color: #000000;
  padding: 0.5em 0;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.5);
  display: none;
  max-height: 450px;
  overflow: scroll;
  width: 100%;
}

@media only screen and (max-height: 500px) {
  .menu-dropdown__dropdown {
    max-height: 200px;
  }
}

.menu-dropdown__dropdown--active {
  display: block;
}

.menu-dropdown__list {
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
}

.menu-dropdown__list-link {
  display: block;
  text-decoration: none;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: background-color 200ms ease-in;
}
.menu-dropdown__list-link:hover {
  background: lightgray;
}
.menu-dropdown__list-link.nuxt-link-exact-active {
  font-weight: bold;
}
.menu-dropdown__button {
  border: 1px solid transparent;
  background: none;
  font-size: 1em;
  line-height: 30px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  font-weight: bold;
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media only screen and (min-width: 600px) {
  .menu-dropdown__button {
    justify-content: center;
  }
}

.menu-dropdown__button:hover,
.menu-dropdown__button--active {
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 200ms ease-in-out;
}
.menu-dropdown__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.menu-dropdown__icon {
  display: inline-block;
  fill: #ffffff;
  margin: 3px 0 3px 0.5em;
  transition: transform 200ms ease-in-out;
}
.menu-dropdown__icon--active {
  transform: rotate(180deg);
}
</style>
