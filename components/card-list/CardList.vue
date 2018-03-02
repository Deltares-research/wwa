<template>
  <ul v-if="cards" class="card-list">
    <transition-group name="slideUp" appear disappear :duration="3000">
    <li v-for="(card, index) in cards" v-bind:key="card.slug" class="card-list__item">
      <card-component
        v-bind:delay="index * 100"
        v-bind:subtitle="(card.book) ? card.book.title : undefined"
        v-bind:title="card.title"
        v-bind:slug="card.slug"
        v-bind:path="card.path"
        v-bind:body="card.body"
        v-bind:theme="card.theme"
        v-bind:count="card.pageCount"
      />
    </li>
    </transition-group>
  </ul>
</template>
<script>
import CardComponent from '~/components/card-component/CardComponent'

export default {
  components: {
    CardComponent
  },
  props: {
    cards: Array
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
}

.card-list__item {
  position: static;
  display: inline-flex;
  height: 20rem;
  margin: 2vw 1vw -10rem 1vw;
  vertical-align: top;
  white-space: normal;
}

/* media min-width is based on li max-width * 100vw / li width */
@media screen and (min-width: 560px) {
  .card-list-item:first-child {
    margin-left: 24vw;
  }
}
</style>
