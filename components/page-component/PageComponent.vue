<template>
  <article class="page-component" v-bind:class="page.theme.slug">
    <div class="page-content">

    <section class="page-body">
      <h1>{{page.title}}</h1>
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
      v-bind:height="page.video.height">
      </iframe>
    </section>

    <aside>
      <div class="storyteller" v-if="page.storyteller">
        <avatar-component
          v-bind:img="page.storyteller.avatar"
          v-bind:name="page.storyteller.name"
          />
      </div>
      <div class="theme">
        <svg-icon v-if="page.theme && page.theme.slug" class="page-icon" v-bind:icon="page.theme.slug" />
      </div>
      <ul class="influences">
        <li v-for="influence in page.influences" v-bind:key="influence.slug">
          <nuxt-link v-bind:to="influence.path">{{ influence.title }}</nuxt-link>
        </li>
      </ul>
      <div class="t_margin_2r">
      <section v-if="page.links" class="links">
        Links: {{page.links}}
      </section>
      <ul v-if="page.keywords" class="keywords list--inline">
        <li v-for="keyword in page.keywords" v-bind:key="keyword.slug">
          <nuxt-link class="tag" v-bind:to="keyword.path">{{ keyword.title }}</nuxt-link>
        </li>
      </ul>
    </div>
    </aside>
    </div>
  </article>
</template>

<script>
import AvatarComponent from '~/components/avatar-component/AvatarComponent'
import SvgIcon from '~/components/svg-icon/SvgIcon'

export default {
  props: {
    page: { type: Object }
  },
  components: {
    AvatarComponent,
    SvgIcon
  }
}
</script>

<style>
@import '../colors/colors.css';
.page-component {

  position: relative;
}

.page-content {
  --padding-v: calc(.5rem + .5vw);
  --padding-h: calc(1rem + 1vw);
  background-color: var(--ui--white);
  color: var(--ui--black);
  max-width: 944px;
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 0 auto;
  min-height: 25vh;
}

.page-component:first-of-type:before,
.page-component:after {
  content: '';
  height: 20rem;
  width: 100%;
  background: linear-gradient(to top, transparent, rgba(0,0,30, .5));
  position: absolute;
  bottom: -15rem;
  z-index: -1;
}

.page-component:first-of-type:before {
  background: linear-gradient(to bottom, transparent, rgba(0,0,30, .5));
  top: -20rem;
}

.page-component aside {
  background: rgb(229,229, 232);
  padding: var(--padding-v) var(--padding-h);
  flex-basis: 30%;
}

.page-component .page-body {
  padding: var(--padding-v) var(--padding-h);
}

.page-component .video {
  margin:2rem auto;
}

.page-component .theme svg {
  width: 4rem;
  height: 4rem;
}

.page-component picture img {
  display:flex;
  max-width:100%;
  margin:0 auto;
}



</style>
