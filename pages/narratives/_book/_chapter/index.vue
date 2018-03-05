<template>
  <div>
    <scroll-indicator v-bind:pages="pages" v-bind:activePage="activePage" />
  <div class="chapter full-width">
    <narrative-header v-bind:book="book" v-bind:chapter="chapter" />
          <page-component
            v-for="page in pages"
            v-bind:key="page.slug"
      v-bind:page="page"
      v-bind:id="page.slug"
            data-page-component
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
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const { book, pages, path, slug, title, previousChapter, nextChapter } = await loadData(context, context.params)
    const chapter = { path, slug, title, previousChapter, nextChapter }

    return { book, chapter, pages, path, slug, title }
  },
  data () {
    return { activePage: null }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.pages)
    this.$store.commit('disableInteraction')
    this.$store.commit('enableGlobeAutoRotation', false)
    const pageSlug = this.$route.hash.replace(/^#/, '')
    this.updateActivePage(pageSlug)
    if ('IntersectionObserver' in window) {
      this.observeIntersectingChildren()
    }
  },
  components: {
    NarrativeFooter,
    NarrativeHeader,
    PageComponent,
    ScrollIndicator
  },
  methods: {
    observeIntersectingChildren () {
      const trackVisibility = (entries) => {
        // No Array.prototype function, so we can break the loop
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const pageSlug = entry.target.id
            this.updateActivePage(pageSlug)
          }
        })
      }
      const observer = new IntersectionObserver(trackVisibility, {
        // No explicit root, we want the viewport
        rootMargin: '-70% 0% -20% 0%',
        thresholds: 0
      })
      const pageComponentsArray = [].slice.call(this.$el.querySelectorAll('[data-page-component]'))
      pageComponentsArray.forEach(el => observer.observe(el))
    },
    scrollToSlug (pageSlug) {
      const activeElement = document.getElementById(pageSlug)
      if (activeElement) {
        activeElement.scrollIntoView()
      }
    },
    updateActivePage (pageSlug) {
      const activePages = (pageSlug) ? this.pages.filter(page => page.slug === pageSlug) : null
      this.activePage = (activePages && activePages[0]) ? activePages[0] : this.pages[0]
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
    },
    activePage (activePage) {
      const path = this.$route.path.replace(/^\//, '') // remove leading slash to maintain router base
      history.replaceState({}, 'page', `${path}#${this.activePage.slug}`)
      this.$store.commit('activateFeature', activePage)
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
