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
  overflow-x: scroll;
  overflow-y: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  white-space: nowrap;
}
.card-list li {
  display: inline-flex;
  width: 50vw;
  min-width: 240px;
  max-width: 960px;
  height: 16rem;
  max-height: 25vh;
  margin: 0;
  padding: calc(.5rem + .5vw);
  vertical-align: top;
  white-space: normal;
}
</style>
