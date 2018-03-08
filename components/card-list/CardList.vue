<template>
  <div class="card-list">
    <header class="card-list__header" v-show="$slots.header">
      <slot name="header"></slot>
    </header>
    <transition-group v-if="cards" class="card-list__list" name="slideUp" tag="ul" appear disappear v-bind:duration="animationDuration">
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
  </div>

</template>

<script>
import CardComponent from '~/components/card-component/CardComponent'

export default {
  data () {
    return { animationDuration: 3000 }
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
  right: -6rem;
  top: 4rem;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(to top, #00001e 2rem, transparent);
  transform: rotate(-70deg);
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
  height: 10.5rem;
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
</style>
