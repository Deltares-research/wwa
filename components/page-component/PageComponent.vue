<template>
  <article class="page-component" v-bind:class="page.theme.slug">
    <div class="page-content">

    <section class="page-body">
      <h1 class="page-title">{{page.title}}</h1>
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

    <aside class="page-aside">
      <section v-if="page.storyteller" class="storyteller">
        <h3 class="title">Author</h3>
        <avatar-component
          v-bind:img="page.storyteller.avatar"
          v-bind:name="page.storyteller.name"
          />
      </section>

      <section v-if="page.theme" class="theme">
        <h3 class="title">Theme</h3>
        <div class="theme-item">
          <svg-icon v-if="page.theme && page.theme.slug" class="theme-icon" v-bind:icon="page.theme.slug" />
          <span class="theme-caption"> {{ page.theme.title }} </span>
        </div>
      </section>

      <SidebarLinksSection v-for="section in linkSections" v-bind:key="section"
        v-if="page[section]" v-bind:links="page[section]" v-bind:title="section" />
    </aside>
    </div>
  </article>
</template>

<script>
import AvatarComponent from '~/components/avatar-component/AvatarComponent'
import SidebarLinksSection from '~/components/sidebar-links-section/sidebarLinksSection'
import SvgIcon from '~/components/svg-icon/SvgIcon'

const linkSections = ['influences', 'keywords']

export default {
  data () {
    return {
      linkSections
    }
  },
  props: {
    page: { type: Object }
  },
  components: {
    AvatarComponent,
    SidebarLinksSection,
    SvgIcon
  }
}
</script>

<style>
@import '../colors/colors.css';

.page-component {
  position: relative;
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

.page-content {
  --padding-v: calc(1rem + .5vw);
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

.page-title {
  margin-top: 0;
}

.page-body {
  font-size: .875rem;
  line-height: 1.4;
  flex-basis: 70%;
}

.page-body img {
  max-width: 100%;
}

.page-component .page-aside {
  --padding-v: calc(1rem + 1vw);
  --padding-h: calc(1rem + 1vw);
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
  width: 3rem;
  height: 3rem;
}

.page-component .storyteller {
  margin-bottom: 1rem;
}

.page-aside .title {
  text-transform: uppercase;
  color: var(--ui--text--light);
  font-size: .9rem;
}


/* create component for this style */
.page-component .theme-item {
  position: relative;
  margin-bottom: 2rem;
  min-height: 3rem;
}

.page-component .theme-icon {
  display: inline-block;
  width: 3rem;
  border-radius: 100%;
  vertical-align: top;
  position: absolute;
  top: 0;
  left: 0;
}

.page-component .theme-caption {
  display: inline-block;
  vertical-align: top;
  padding-top: .4rem;
  padding-left: calc( 3rem + .7rem );
}

</style>
