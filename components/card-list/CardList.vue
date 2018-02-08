<template>
  <section class="card-list">
    <transition name="slide-up">
      {# create component for navigation
        How to do a if switch here? I would like to switch between link and
        span for the book title. Or is this the way to go? #}
      <h1 class="card-list-title invert" v-if="show">
        <nuxt-link class="card-list-title-chunk" v-if="book" v-bind:to="'/'">
          <span class="sr-only">Go to books</span> Overview
        </nuxt-link>
        <nuxt-link class="card-list-title-chunk" v-if="chapter" v-bind:to="book.path">
          <span class="sr-only">Go to book</span> {{ book.title }}
        </nuxt-link>
        <span class="card-list-title-chunk" v-if="!chapter && book">
          <span class="sr-only">Current book</span> {{ book.title }}
        </span>
        <span class="card-list-title-chunk" v-if="chapter">
          <span class="sr-only">Current chapter</span> {{ chapter.title }}
        </span>
      </h1>
    </transition>
    <ul v-if="cards" class="card-list">
      <li v-for="card, index in cards" v-bind:key="card.slug" class="card-list-item">
        <card-component
          v-bind:delay="index * 100"
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
  </section>
</template>
<script>
import CardComponent from '~/components/card-component/CardComponent'

export default {
  components: {
    CardComponent
  },
  props: [ 'book', 'chapter', 'cards' ],
  data () {
    return {
      show: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.show = true
    }, 0)
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
}

.card-list-title {
  color: var(--ui--text--invert);
  position: absolute;
  left: 24vw;
  transform: translateY(-105%);
  padding: 15px;
  margin: 0;
}

.card-list-title-chunk + .card-list-title-chunk:before {
  content: '‣';
  opacity: .8;
  padding: 0 5px;
}

.card-list-title-chunk:not(:last-child) {
  opacity: .8;
}

.card-list-item {
  position: static;
  display: inline-flex;
  width: 50vw;
  min-width: 280px;
  max-width: 960px;
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
