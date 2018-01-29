<template>
  <article>
    <header>
      <h1>{{page.title}}</h1>
      <ul class="influences">
        <li v-for="influence in page.influences" v-bind:key="influence.slug">
          <nuxt-link v-bind:for="influence.path">{{ influence.title }}</nuxt-link>
        </li>
      </ul>
      <div class="storyteller" v-if="page.storyteller">
        <avatar-component
          v-bind:avatar="page.storyteller.avatar"
          v-bind:name="page.storyteller.name"
          />
          {{page.storyteller.name}}
      </div>
    </header>
    <section v-if="page.body" class="body">
      {{body}}
    </section>
    <section v-if="page.pictures" class="pictures">
      <picture v-for="picture in page.pictures" v-bind:key="picture.id">
        {{picture}}
      </picture>
    </section>
    <section v-if="page.graphs" class="graphs">
      <figure v-for="graph in page.graphs" v-bind:key="graph.id">
        {{graph}}
        <figcaption>{{graph.alt}}</figcaption>
      </figure>
    </section>
    <section v-if="page.video" class="video">
      {{page.video}}
    </section>
    <footer v-if="page.footnotes" class="footnotes">
      {{page.footnotes}}
    </footer>
  </article>
</template>

<script>
import '~/components/colors/colors.css'
import AvatarComponent from '~/components/avatar-component/avatarComponent'

export default {
  props: {
    page: {
      type: Object
    }
    // 'body',
    // 'endDate',
    // 'footnotes',
    // 'graphs',
    // 'influences',
    // 'keywords',
    // 'location',
    // 'pictures',
    // 'slug',
    // 'startDate',
    // 'storyteller',
    // 'storytellerAvatar',
    // 'title',
    // 'video',
    // 'zoomLevel'
  },
  components: {
    AvatarComponent
  }
}
</script>

<style scoped>
article {
  --padding-v: calc(.5rem + .5vw);
  --padding-h: calc(1rem + 1vw);
  background-color: var(--ui--white);
  padding: var(--padding-v) var(--padding-h);
  width: 90vw;
  min-height: 25vh;
  min-width: 320px;
  max-width: 960px;
}
</style>

