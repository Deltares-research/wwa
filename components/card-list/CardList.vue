<template>
  <div class="card-list">
    <header
      class="card-list__header"
      v-show="$slots.header"
    >
      <slot name="header" />
    </header>
    <transition-group
      v-if="cards"
      class="card-list__list"
      name="slideUp"
      tag="ul"
      appear
      disappear
      :duration="animationDuration"
    >
      <li
        v-for="card in cards"
        :key="card.slug"
        :id="card.slug"
        class="card-list__item"
        data-list-item
      >
        <card-component
          :subtitle="(card.book) ? card.book.title : subtitle"
          :title="card.title"
          :slug="card.slug"
          :path="card.path"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
import CardComponent from '~/components/card-component/CardComponent'
export default {
  data () {
    return {
      animationDuration: 3000
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
  },
  computed: {
  },
  methods: {
  },
  components: { CardComponent }
}
</script>

<style>
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
  height: 8rem;
  /* background: linear-gradient(to top, #00001e 2rem, transparent); */
   /* transform: rotate(-70deg); */
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
.card-list__scroll-button:focus {
  outline: none;
}
</style>
