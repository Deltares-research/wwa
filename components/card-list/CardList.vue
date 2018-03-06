<template>
  <div>
  <transition-group  v-if="cards" class="card-list" name="slideUp" tag="ul" appear disappear :duration="3000">
    <li v-for="(card, index) in cards" v-bind:key="card.slug" class="card-list__item">
      <card-component
        v-bind:delay="index * 100"
        v-bind:title="card.title"
        v-bind:subtitle="(card.book && card.book.title) ? card.book.title : subtitle"
        v-bind:slug="card.slug"
        v-bind:path="card.path"
        v-bind:body="card.body"
        v-bind:theme="card.theme"
        v-bind:count="card.pageCount"
      />
    </li>
  </transition-group>
  <button class="card-list__scroll-button"><span class="sr-only">Scroll to next</span></button>
  </div>

</template>

<script>
import CardComponent from '~/components/card-component/CardComponent'

export default {
  components: {
    CardComponent
  },
  props: {
    cards: Array,
    subtitle: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>
<style>
@import '../colors/colors.css';
@import '../animations/animations.css';

.card-list {
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
  vertical-align: top;
  white-space: normal;
}

@media screen and (min-width: 72rem) {
  .card-list__item {
    flex: 0 0 30vw;
    width: 30vw;
  }
}

.card-list__scroll-button {
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  background-color: var(--ui--white);
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
}

</style>
