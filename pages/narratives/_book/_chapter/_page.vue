<template>
  <div>
    <header class="header">
      <h1 class="h2 invert"><nuxt-link v-bind:to="book.path">{{book.title}}</nuxt-link></h1>
      <h2 class="h1 invert"><nuxt-link v-bind:to="chapter.path">{{chapter.title}}</nuxt-link></h2>
    </header>
    <page-component v-for="page in pages" v-bind:key="page.slug"
      v-bind:page="page"
      v-bind:id="page.slug"
      class="page-component" />
  </div>
</template>

<script>
import Vue from 'vue'
import VueEvents from 'vue-events'
import loadData from '~/lib/load-data'
import PageComponent from '~/components/page-component/PageComponent'

Vue.use(VueEvents)

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
  created () {
  },
  mounted () {
    const activePages = this.pages.filter(page => page.slug === this.slug)
    console.log('page', activePages)
    this.activePage = activePages[0]
    this.$events.$emit('marker-selected', this.activePage)
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
            const { base = '' } = this.$router.options
            const book = this.$route.params.book
            const chapter = this.$route.params.chapter
            const page = entry.target.id
            const path = `${base}narratives/${book}/${chapter}/${page}`
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
      if (activePage) {
        const top = activePage.getBoundingClientRect().top || windowHeight
        const y = Math.round(top - (windowHeight / 2)) // match with margin between PageComponents
        window.scroll(0, y)
      }
    }
  }
}
</script>

<style>
.header {
  max-width: 960px;
  width: 100%;
  margin: auto;
  margin-top: 62.5vh;
  color: #fff;
}
.header a {
  color: inherit;
  text-decoration: none;
}
.header + .page-component {
  margin-top: 0;
}
.page-component {
  margin: 50vh auto; /* Note that these margins should collapse */
}
</style>
