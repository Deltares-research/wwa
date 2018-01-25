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
  overflow-y: scroll;
  white-space: nowrap;
  position: absolute;
  bottom: 0;

}
.card-list li {
  width: 50vw;
  min-width: 240px;
  max-width: 960px;
  display: inline-flex;
  margin: 0;
  padding: calc(.5rem + .5vw);
  padding-bottom: 0;
  white-space: normal;
  vertical-align: top;
  height: 8rem;
}
</style>
