<template>
  <div>
    <div data-scrolled-to-top-trigger />
    <scroll-indicator
      v-if="chapter.pages.length > 1"
      :pages="chapter.pages"
      :activePage="activePage"
    />
    <div class="chapter chapter-column">
      <narrative-header
        :chapter="chapter"
        :pages="chapter.pages"
        :active-page="activePage && activePage.slug"
        :condensed="headerCondensed"
        @selectLink="smoothScroll"
      />
      <page-component
        data-page-component
        v-for="(page, index) in chapter.pages"
        :key="`${page.slug}-${index}`"
        :page="page"
        :id="page.slug"
        :ref="page.slug"
        :class="['chapter__page', `chapter__page--${index}`]"
      />
      <narrative-footer
        :previousLink="chapter.previousChapter"
        :nextLink="chapter.nextChapter"
        :related="chapter.related"
      />
    </div>
    <portal to="menu-center-content">
      <menu-dropdown :book="book" :booksList="allBooks" :path="path" />
    </portal>
  </div>
</template>

<script>
import fetchContent from '~/lib/fetch-content';

import MenuDropdown from '~/components/menu-dropdown/MenuDropdown'
import NarrativeFooter from '~/components/narrative-footer/NarrativeFooter'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import PageComponent from '~/components/page-component/PageComponent'
import ScrollIndicator from '~/components/scroll-indicator/ScrollIndicator'

export default {
  async asyncData ({ params, route }) {
    const query = `
      {
        chapter(locale: ${params.language}, filter: {slug: {eq: "climate-change-and-migration"}}) {
          title
          cover {
            responsiveImage {
              src
            }
          }
          related {
            slug
            title
          }

          pages {
            slug
            body
            createdAt
            date
            title
            links
            theme {
              slug
              title
            }
            images {
              alt
              responsiveImage {
                src
                width
                height
              }
            }
            graphs {
              height
              width
              responsiveImage {
                src
              }
              title
            }
            location {
              lat: latitude
              lon: longitude
            }
          }
        }

        book(locale: en, filter: { slug: { eq: "drought" } }) {
          title
        }

        allBooks {
          slug
          title
        }
      }
    `

    return {
      ...await fetchContent(query),
      path: route.path,
    }
  },
  data: function () {
    return {
      activePage: null,
      scrollIntoViewSupport: false,
      headerCondensed: false
    }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.chapter.pages)
    this.$store.commit('disableInteraction')
    this.$store.commit('disableGlobeAutoRotation')
    this.$store.commit('enableGlobePositionRight')
    const pageSlug = this.$route.hash.replace(/^#/, '')
    this.updateActivePage(pageSlug)
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
      this.observeIntersectingChildren()
      this.observeScrolledToTop()
    }
  },
  destroyed () {
    this.$store.commit('disableGlobePositionRight')
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
    smoothScroll (slug) {
      const element = this.$refs[slug][0].$el
      const domRect = element.getBoundingClientRect()
      window.scrollBy({ top: domRect.y - 160, behavior: 'smooth' })
    },
    updateActivePage (pageSlug) {
      const activePages = (pageSlug) ? this.chapter.pages.filter(page => page.slug === pageSlug) : null
      this.activePage = (activePages && activePages[0]) ? activePages[0] : this.chapter.pages[0]
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

/*
* style rules for a minimal print layout
*/

@media print {
  .chapter-column {
    position: relative;
    padding: 0;
    background-color: var(--ui--white);
  }
}
</style>
