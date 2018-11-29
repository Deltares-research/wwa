<template>
  <div>
    <div data-scrolled-to-top-trigger />
    <scroll-indicator v-bind:pages="pages" v-bind:activePage="activePage" />
    <div class="chapter chapter-column">
      <narrative-header
        :chapter="chapter"
        :pages="pages"
        :active-page="activePage && activePage.slug"
        :condensed="headerCondensed"/>
      <page-component
        data-page-component
        v-for="(page, index) in pages"
        v-bind:key="page.slug"
        v-bind:page="page"
        v-bind:id="page.slug"
        :class="['chaper__page', `chapter__page--${index}`]"
      />
      <narrative-footer
        v-bind:previousLink="chapter.previousChapter"
        v-bind:nextLink="chapter.nextChapter"
      />
    </div>
    <portal to="menu-center-content">
      <menu-dropdown v-bind:book="book" v-bind:booksList="booksList" />
    </portal>
  </div>
</template>

<script>
import MenuDropdown from '~/components/menu-dropdown/MenuDropdown'
import NarrativeFooter from '~/components/narrative-footer/NarrativeFooter'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import PageComponent from '~/components/page-component/PageComponent'
import ScrollIndicator from '~/components/scroll-indicator/ScrollIndicator'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const { book, pages, path, slug, title, previousChapter, nextChapter, cover } = await loadData(context, context.params)
    const chapter = { path, slug, title, previousChapter, nextChapter, cover }
    const booksList = await loadData(context, { booksList: 'index' })
    return { book, chapter, pages, path, slug, title, booksList }
  },
  data () {
    return {
      activePage: null,
      scrollIntoViewSupport: false,
      headerCondensed: false
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.pages)
    this.$store.commit('disableInteraction')
    this.$store.commit('disableGlobeAutoRotation')
    const pageSlug = this.$route.hash.replace(/^#/, '')
    this.updateActivePage(pageSlug)
    if ('IntersectionObserver' in window) {
      this.observeIntersectingChildren()
      this.observeScrolledToTop()
    }
  },
  components: {
    NarrativeFooter,
    NarrativeHeader,
    MenuDropdown,
    PageComponent,
    ScrollIndicator
  },
  methods: {
    observeIntersectingChildren () {
      const trackVisibility = (entries) => {
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
    observeScrolledToTop () {
      const trackVisibility = (entries) => {
        entries.forEach(entry => {
          this.headerCondensed = !entry.isIntersecting
        })
      }
      const observer = new IntersectionObserver(trackVisibility, {
        // No explicit root, we want the viewport
        rootMargin: '0% 0% 0% 0%',
        thresholds: 0
      })
      const triggerElement = this.$el.querySelector('[data-scrolled-to-top-trigger]')
      observer.observe(triggerElement)
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
      const path = this.$route.path.replace(/^\/\//, '/') // remove leading slash to maintain router base
      history.replaceState({}, 'page', `${path}#${this.activePage.slug}`)
      this.$store.commit('activateFeature', activePage)
    }
  }
}
</script>

<style>
.chapter-column {
  position: absolute;
  top: 0;
  left:0;
  padding-top: 64px;
  z-index: 0;
  width: 100vw;
  background-color: #dde4eb;
  overflow: hidden;
}

@media only screen and (min-width: 1024px) {
  .chapter-column {
    width: 67vw;
  }
}

@media only screen and (min-width: 1440px) {
  .chapter-column {
    width: 50vw;
  }
}

[data-scrolled-to-top-trigger] {
  display: block;
  position: absolute;
  top: 10.25rem;
  right: 0;
  width: 1px;
  height: 1px;
  background-color: transparent;
  z-index: 1;
}

@media (min-width: 768px) {
  [data-scrolled-to-top-trigger] {
    top: calc(12.5rem + 1px);
  }
}
</style>
