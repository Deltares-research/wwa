<template>
  <ul v-if="cards" class="card-list">
    <li v-for="card in cards" v-bind:key="card.slug">
      <card-component
        v-bind:title="card.title"
        v-bind:slug="card.slug"
        v-bind:path="card.path"
        v-bind:body="card.body"
        v-bind:theme="card.theme"
        v-bind:video="card.video"
      />
    </li>
  </ul>
</template>
<script>
import CardComponent from '~/components/card-component/CardComponent'
export default {
  components: {
    CardComponent
  },
  props: [ 'cards' ]
}
</script>
<style>
.card-list {
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  bottom: 0;
  right: 0;
  top:0;
  white-space: nowrap;
}
.card-list li {
  display: flex;
  width: 25vw;
  min-width: 240px;
  max-width: 960px;
  height: 16rem;
  max-height: 25vh;
  margin: 0;
  padding: calc(.5rem + .5vw);
  white-space: normal;
}
</style>
