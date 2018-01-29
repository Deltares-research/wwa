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

function observeIntersectingChildren (component) {
  const intersectionRatio = 0.001
  const observer = new IntersectionObserver(entries => {
    trackVisibility(entries, component, intersectionRatio)
    // TODO: Pan & Zoom to
  }, {
    // No explicit root, we want the viewport
    rootMargin: '-40% 0% -40% 0%', // Start from middle of screen
    thresholds: [ intersectionRatio ]
  })
  const pageComponentsArray = [].slice.call(component.$el.children)
  pageComponentsArray.forEach(el => observer.observe(el))
}

function trackVisibility (entries, component, intersectionRatio) {
  // No Array.prototype function, so we can break the loop
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const book = component.$route.params.book
      const chapter = component.$route.params.chapter
      const page = entry.target.id
      const path = `/narratives/${book}/${chapter}/${page}`
      if (path !== window.location.pathname) {
        history.pushState({}, page, path)
      }
      break
    }
  }
}

function scrollToSlug (id) {
  const activePage = document.getElementById(id)
  const windowHeight = (window.innerHeight || document.clientHeight)
  const top = activePage.getBoundingClientRect().top || windowHeight
  const y = Math.round(top - (windowHeight / 2)) // match with margin between PageComponents
  window.scroll(0, y)
}

export default {
  asyncData (context) {
    return loadData(context)
  },
  mounted () {
    if ('IntersectionObserver' in window) {
      observeIntersectingChildren(this)
    }
    scrollToSlug(this.$route.params.page)
  },
  components: {
    PageComponent
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
