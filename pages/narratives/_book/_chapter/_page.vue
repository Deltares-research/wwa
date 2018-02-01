<template>
  <div>
    <page-component v-for="page in pages" v-bind:key="page.slug"
      v-bind:page="page"
      v-bind:id="page.slug"
      class="page-component" />
  </div>
</template>

<script>
import loadData from '~/lib/load-data'
import PageComponent from '~/components/page-component/PageComponent'

export default {
  asyncData (context) {
    return loadData(context, context.params)
  },
  mounted () {
    if ('IntersectionObserver' in window) {
      this.observeIntersectingChildren()
    }
    this.scrollToSlug()
  },
  components: {
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
        rootMargin: '-40% 0% -40% 0%', // Start from middle of screen
        thresholds: [ intersectionRatio ]
      })
      const pageComponentsArray = [].slice.call(this.$el.children)
      pageComponentsArray.forEach(el => observer.observe(el))

      const trackVisibility = entries => {
        // No Array.prototype function, so we can break the loop
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const book = this.$route.params.book
            const chapter = this.$route.params.chapter
            const page = entry.target.id
            const path = `/narratives/${book}/${chapter}/${page}`
            if (path !== window.location.pathname) {
              history.replaceState({}, page, path)
            }
            break
          }
        }
      }
    },
    scrollToSlug () {
      const activePage = document.getElementById(this.$route.params.page)
      const windowHeight = (window.innerHeight || document.clientHeight)
      const top = activePage.getBoundingClientRect().top || windowHeight
      const y = Math.round(top - (windowHeight / 2)) // match with margin between PageComponents
      window.scroll(0, y)
    }
  }
}
</script>

<style>
.page-component:first-child {
  margin-top: 62.5vh;
}
.page-component {
  margin: 50vh auto; /* Note that these margins should collapse */
}
</style>
