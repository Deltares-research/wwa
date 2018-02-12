<template>
  <div>
    <narrative-header v-bind:book="book" v-bind:chapter="chapter" />
    <page-component v-for="page in pages" v-bind:key="page.slug"
      v-bind:page="page"
      v-bind:id="page.slug"
      class="page-component" />
  </div>
</template>

<script>
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import PageComponent from '~/components/page-component/PageComponent'
import events from '~/components/events/events'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const { pages } = await loadData(context, context.params)
    const book = pages[0].book
    const chapter = pages[0].chapter
    const slug = context.params.page
    return {
      book,
      chapter,
      pages,
      slug
    }
  },
  data () {
    return {
      activePage: null
    }
  },
  mounted () {
    const activePages = this.pages.filter(page => page.slug === this.slug)
    this.activePage = activePages[0]
    this.$events.$emit(events.disableGlobeNavigation)
    this.$events.$emit(events.featuresChanged, this.pages)
    if ('IntersectionObserver' in window) {
      this.observeIntersectingChildren()
    }
    this.updateActiveFeature()
  },
  components: {
    NarrativeHeader,
    PageComponent
  },
  methods: {
    updateActiveFeature (slug = this.slug) {
      const activePages = this.pages.filter(page => page.slug === slug)
      if (activePages) {
        this.activePage = activePages[0]
        this.$events.$emit(events.activeFeatureChanged, this.activePage)
      }
    },
    observeIntersectingChildren () {
      const intersectionRatio = 0.001
      const observer = new IntersectionObserver(entries => {
        trackVisibility(entries)
        // TODO: Pan & Zoom to
      }, {
        // No explicit root, we want the viewport
        rootMargin: '-5% 0% -5% 0%', // Start from middle of screen
        thresholds: [ intersectionRatio ]
      })
      const pageComponentsArray = [].slice.call(this.$el.children)
      pageComponentsArray.forEach(el => observer.observe(el))

      const trackVisibility = entries => {
        // No Array.prototype function, so we can break the loop
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const { base = '/' } = this.$router.options
            const bookSlug = this.$route.params.book
            const chapterSlug = this.$route.params.chapter
            const pageSlug = entry.target.id
            const path = `${base}narratives/${bookSlug}/${chapterSlug}#${pageSlug}`
            if (path !== window.location.pathname) {
              history.replaceState({}, 'page', path)
              this.updateActiveFeature(pageSlug)
            }
            break
          }
        }
      }
    }
  }
}
</script>

<style>
.narrative-header {
  max-width: 960px;
  width: 100%;
  margin: auto;
  margin-top: 40vh;
}

.narrative-header + .page-component {
  margin-top: 0;
}
.page-component {
  margin: 50vh auto; /* Note that these margins should collapse */
}
</style>
