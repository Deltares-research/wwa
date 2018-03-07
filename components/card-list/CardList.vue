<template>
  <div class="card-list">
    <header class="card-list__header" v-show="$slots.header">
      <slot name="header"></slot>
    </header>
    <transition-group v-if="cards" class="card-list__list" name="slideUp" tag="ul" appear disappear :duration="3000">
      <li v-for="card in cards"
        v-bind:key="card.slug"
        v-bind:id="card.slug"
        class="card-list__item"
        data-list-item>
        <card-component
          v-bind:subtitle="(card.book) ? card.book.title : subtitle"
          v-bind:title="card.title"
          v-bind:slug="card.slug"
          v-bind:path="card.path"
        />
      </li>
    </transition-group>
    <button v-bind:hidden="!nextListItem" class="card-list__scroll-button" v-on:click="scrollToNext()">
      <span class="sr-only">Scroll to next</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" d="M7 2l11 10L7 23"/></svg>
    </button>
  </div>

</template>

<script>
import CardComponent from '~/components/card-component/CardComponent'

export default {
  data () {
    return {
      nextListItem: undefined
    }
  },
  props: {
    cards: Array,
    subtitle: {
      type: String,
      default () {
        return ''
      }
    }
  },
  mounted () {
    if ('IntersectionObserver' in window && 'scrollIntoView' in document.body) {
      this.observeIntersectingChildren()
    }
  },
  methods: {
    observeIntersectingChildren () {
      const trackVisibility = (entries) => {
        const lastListItemEntry = entries[entries.length - 1]
        let nextListItem = this.nextListItem
        if (lastListItemEntry.intersectionRatio === 1) {
          nextListItem = false
        } else {
          entries.forEach((entry, index) => {
            if (entry.intersectionRatio <= 1 && entry.intersectionRatio > 0) {
              // lastVisibleElement = entry.target
              nextListItem = entry.target
            }
          })
        }
        this.nextListItem = nextListItem
      }
      console.log()
      const observer = new IntersectionObserver(trackVisibility, {
        root: this.$el, // root element is card-list
        rootMargin: '0% 0% 0% 0%',
        thresholds: 1
      })
      const cardComponentsArray = [].slice.call(this.$el.querySelectorAll('[data-list-item]'))
      cardComponentsArray.forEach(el => observer.observe(el))
    },
    scrollToNext () {
      if (this.nextListItem) {
        const left = this.nextListItem.offsetLeft
        this.nextListItem.parentElement.scrollLeft = left
      }
    }
  },
  components: { CardComponent }
}
</script>

<style>
@import '../colors/colors.css';
@import '../animations/animations.css';

.card-list {
  position: relative;
  width: 100%;
}
.card-list::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3rem;
}
.card-list__list {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding-left: 0;
  padding-right: 0;
  margin: 0;
  display: flex;
  flex: 0 1 auto;
}
.card-list__item {
  position: static;
  display: inline-flex;
  flex: 0 0 22rem;
  width: 22rem;
  margin: 0;
  padding: 0;
  vertical-align: top;
  white-space: normal;
}
.card-list__item:first-child {
  margin-left: 1rem;
}
.card-list__item:last-child {
  margin-right: 1rem;
}

@media screen and (min-width: 72rem) {
  .card-list__item {
    flex: 0 0 30vw;
    width: 30vw;
  }
}

.card-list__header {
  padding-left: 2rem;
}
.card-list__scroll-button {
  border: none;
  position: absolute;
  top: 4rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: var(--ui--black--trans);
  box-shadow: 2rem 2rem 4rem 4rem var(--ui--black--trans);
  z-index: 1;
  font-size: 2rem;
  text-align: center;
  line-height: .25rem;
}
</style>
