<template>
  <ul v-if="cards" class="card-list">
    <li v-for="card in cards" v-bind:key="card.slug" class="card-list-item">
      <card-component
        v-bind:title="card.title"
        v-bind:slug="card.slug"
        v-bind:path="card.path"
        v-bind:body="card.body"
        v-bind:theme="card.theme"
        v-bind:video="card.video"
        v-bind:count="card.pageCount"
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
  white-space: nowrap;
  padding:0;
  margin:1rem 0;
}

.card-list-item {
  display: inline-flex;
  width: 50vw;
  min-width: 280px;
  max-width: 960px;
  height: 16rem;
  max-height: 24vh;
  margin: 0 1vw;
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
