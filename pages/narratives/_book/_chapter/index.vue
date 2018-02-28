<template>
  <div>
    <scroll-indicator v-bind:pages="pages" v-bind:activePage="activePage" />
  <div class="chapter full-width">
      <narrative-header v-bind:book="book" v-bind:chapter="chapter" />
      <page-component v-for="page in pages" v-bind:key="page.slug"
        v-bind:page="page"
        v-bind:id="page.slug"
        v-observe-visibility="visibilityChanged"
        class="page-component" />
      <narrative-footer
        v-bind:previousLink="chapter.previousChapter"
        v-bind:nextLink="chapter.nextChapter" />
    </div>
  </div>
</template>

<script>
import NarrativeFooter from '~/components/narrative-footer/NarrativeFooter'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import PageComponent from '~/components/page-component/PageComponent'
import ScrollIndicator from '~/components/scroll-indicator/ScrollIndicator'
import Vue from 'vue'
import loadData from '~/lib/load-data'
import { ObserveVisibility } from 'vue-observe-visibility'

Vue.directive('observe-visibility', ObserveVisibility)

export default {
  async asyncData (context) {
    const { book, pages, path, slug, title, previousChapter, nextChapter } = await loadData(context, context.params)
    const chapter = { path, slug, title, previousChapter, nextChapter }

    context.store.commit('globe/replaceFeatures', pages)
    context.store.commit('globe/disableInteraction')

    return { book, chapter, pages, path, slug, title }
  },
  data () {
    return { activePage: null }
  },
  mounted () {
    const pageSlug = this.$route.hash.replace(/^#/, '')
    this.updateActivePage(pageSlug)
  },
  components: {
    NarrativeFooter,
    NarrativeHeader,
    PageComponent,
    ScrollIndicator
  },
  methods: {
    scrollToSlug (pageSlug) {
      const activeElement = document.getElementById(pageSlug)
      if (activeElement) {
        activeElement.scrollIntoView()
        this.updateActiveFeature(pageSlug)
      }
    },
    updateActivePage (pageSlug) {
      const activePages = (pageSlug) ? this.pages.filter(page => page.slug === pageSlug) : null
      this.activePage = (activePages && activePages[0]) ? activePages[0] : this.pages[0]
      if (this.activePage) {
        history.replaceState({}, 'page', `${this.$route.path}#${this.activePage.slug}`)
        this.updateActiveFeature()
      }
    },
    updateActiveFeature () {
      this.$store.commit('globe/activateFeature', this.activePage)
    },
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        this.updateActivePage(entry.target.id)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if ((to.path === from.path) && (to.hash !== from.hash)) {
        this.scrollToSlug(to.hash.replace(/^#/, ''))
      }
    }
  }
}
</script>

<style>

:root {
  --target-offset: 75vh
}

.full-width {
  position: absolute;
  top: var(--target-offset);
  left:0;
  right: 0;
}

.chapter .narrative-header {
  width: 100%;
  margin: auto;
  margin-bottom: calc(-1 * var(--target-offset));
  position: relative;
  z-index: 1;
}
</style>
