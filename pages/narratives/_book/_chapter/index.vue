<template>
  <div class="chapter full-width">
    <narrative-header v-bind:book="book" v-bind:chapter="chapter" />
    <page-component v-for="page in pages" v-bind:key="page.slug"
      v-bind:page="page"
      v-bind:id="page.slug"
      class="page-component" />
    <narrative-footer v-bind:previousLink="chapter.previousChapter" v-bind:nextLink="chapter.nextChapter" />
  </div>
</template>

<script>
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import NarrativeFooter from '~/components/narrative-footer/NarrativeFooter'
import PageComponent from '~/components/page-component/PageComponent'
import loadData from '~/lib/load-data'

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
    if ('IntersectionObserver' in window) {
      this.observeIntersectingChildren()
    }
  },
  components: {
    NarrativeHeader,
    NarrativeFooter,
    PageComponent
  },
  methods: {
    observeIntersectingChildren () {
      const intersectionRatio = 0.001
      const observer = new IntersectionObserver(entries => {
        trackVisibility(entries)
        // TODO: Pan & Zoom to
      }, {
        // No explicit root, we want the viewport
        rootMargin: '-40% 0% -40% 0%',
        thresholds: [ intersectionRatio ]
      })
      const pageComponentsArray = [].slice.call(this.$el.children)
      pageComponentsArray.forEach(el => observer.observe(el))

      const trackVisibility = entries => {
        // No Array.prototype function, so we can break the loop
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const pageSlug = entry.target.id
            if (`#${pageSlug}` !== this.$route.hash) {
              this.updateActivePage(pageSlug)
            }
            break
          }
        }
      }
    },
    scrollToSlug (pageSlug) {
      const activePages = this.pages.filter(page => page.slug === pageSlug)
      const activeElement = document.getElementById(pageSlug)
      if (activeElement && activePages) {
        const windowHeight = (window.innerHeight || document.clientHeight)
        const top = activeElement.getBoundingClientRect().top || windowHeight
        const y = Math.round(top - (windowHeight / 2)) // match with margin between PageComponents
        window.scroll(0, y)
        this.updateActiveFeature()
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
