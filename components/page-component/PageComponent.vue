<template>
  <article class="page-component" v-bind:class="themeClasses">
    <header>
      <h1>{{page.title}}</h1>
      <ul class="influences">
        <li v-for="influence in page.influences" v-bind:key="influence.slug">
          <nuxt-link v-bind:to="influence.path">{{ influence.title }}</nuxt-link>
        </li>
      </ul>
      <div class="storyteller" v-if="page.storyteller">
        <avatar-component
          v-bind:img="page.storyteller.avatar"
          v-bind:name="page.storyteller.name"
          />
      </div>
    </header>
    <section v-if="page.body" class="body t_margin_2r">
      {{page.body}}
    </section>
    <section v-if="page.images" class="images t_margin_2r">
      <picture v-for="image in page.images" v-bind:key="image.id">
        <img v-bind:src="image.imgixHost + image.value.path"/>
      </picture>
    </section>
    <section v-if="page.graphs" class="graphs">
      <figure v-for="graph in page.graphs" v-bind:key="graph.id">
        <img v-bind:src="graph.imgixHost + graph.value.path"/>
        <figcaption>{{graph.alt}}</figcaption>
      </figure>
    </section>
    <iframe v-if="page.video" class="video"
    v-bind:src="'https://www.' + page.video.provider + '.com/embed/' + page.video.providerUid"
    v-bind:width="page.video.width"
    v-bind:height="page.video.height"
    >
    </iframe>
    <footer class="t_margin_2r">
      <section v-if="page.links" class="links">
        Links: {{page.links}}
      </section>
      <ul v-if="page.keywords" class="keywords list--inline">
        <li v-for="keyword in page.keywords" v-bind:key="keyword.slug">
          <nuxt-link class="tag" v-bind:to="keyword.path">{{ keyword.title }}</nuxt-link>
        </li>
      </ul>
    </footer>
  </article>
</template>

<script>
import AvatarComponent from '~/components/avatar-component/avatarComponent'

export default {
  props: {
    page: {
      type: Object
    }
    // 'body',
    // 'endDate',
    // 'links',
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
    //  'theme',
    // 'zoomLevel'
  },
  components: {
    AvatarComponent
  },
  computed: {
    themeClasses: function () {
      if (this.page.theme && this.page.theme.length > 0) {
        var themes = []
        var i
        for (i in this.page.theme) {
          themes = themes + this.page.theme[i].slug + ' '
        }
      }
      return themes
    }
  }
}
</script>

<style>
@import '../colors/colors.css';

.page-component {
  --padding-v: calc(.5rem + .5vw);
  --padding-h: calc(1rem + 1vw);
  background-color: var(--ui--white);
  color: var(--ui--text);
  padding: var(--padding-v) var(--padding-h);
  width: 90vw;
  min-height: 25vh;
  min-width: 320px;
  max-width: 960px;
  position:relative;
}

.page-component::before {
  content: '';
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:1rem;
}

.page-component.too-little::before {
  background-color: var(--too-little);
}

.page-component.too-dirty::before {
  background-color: var(--too-dirty);
}

.page-component.too-much::before {
  background-color: var(--too-much);
}

.page-component .video {
  margin:2rem auto;
}

.page-component picture img
 {
  display:flex;
  max-width:100%;
  margin:0 auto;
}

</style>

