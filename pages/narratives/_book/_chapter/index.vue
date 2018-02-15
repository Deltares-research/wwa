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
    const { book, pages, path, slug, title } = await loadData(context, context.params)
    const chapter = { path, slug, title }
    return { book, chapter, pages, path, slug, title }
  },
  data () {
    return { activePage: null }
  },
  mounted () {
    this.scrollToSlug(this.$route.hash.replace(/^#/, ''))
    this.$events.$emit(events.disableGlobeNavigation)
    this.$events.$emit(events.featuresChanged, this.pages)

    if ('IntersectionObserver' in window) {
      this.observeIntersectingChildren()
    }
  },
  components: {
    NarrativeHeader,
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
        rootMargin: '-40% 0% -40% 0%', // Interested in the in the lower part of the screen
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
              history.replaceState({}, 'page', `${this.$route.path}#${pageSlug}`)
              this.updateActiveFeature(pageSlug)
            }
            break
          }
        }
      }
    },
    scrollToSlug (slug) {
      const activePages = this.pages.filter(page => page.slug === slug)
      const activeElement = document.getElementById(slug)
      if (activeElement && activePages) {
        const windowHeight = (window.innerHeight || document.clientHeight)
        const top = activeElement.getBoundingClientRect().top || windowHeight
        const y = Math.round(top - (windowHeight / 2)) // match with margin between PageComponents
        window.scroll(0, y)
        this.updateActiveFeature(slug)
      }
    },
    updateActiveFeature (slug) {
      const activePages = this.pages.filter(page => page.slug === slug)
      if (activePages) {
        this.activePage = activePages[0]
        this.$events.$emit(events.activeFeatureChanged, this.activePage)
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
