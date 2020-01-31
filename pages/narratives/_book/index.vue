<template>
  <div class="invert">
    <div class="globe-spacer-narrative"/>
    <div class="layout-section">
      <div class="layout-section__container">
        <div class="book-header">
          <h1 class="book-title">{{ title }}</h1>
          <p
            v-if="body.length"
            class="book-description"
          >
            {{ body }}
          </p>
        </div>
      </div>
    </div>
    <div class="layout-section layout-section--gradient">
      <div class="layout-section__container">
        <chapter-list :chapters="chapters" sorted="newest" :limit="9" />
      </div>
    </div>
    <portal to="menu-center-content">
      <transition name="fade">
        <menu-dropdown :book="{ title }" :booksList="booksList" />
      </transition>
    </portal>
  </div>
</template>

<script>
import ChapterList from '~/components/chapter-list/ChapterList'
import MenuDropdown from '~/components/menu-dropdown/MenuDropdown'
import NarrativeHeader from '~/components/narrative-header/NarrativeHeader'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' })
    const booksList = await loadData(context, { booksList: 'index' })
    const { title, body, chapters, theme } = await loadData(context, context.params)
    return { booksList, title, body, chapters, themes: await themes, theme }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.chapters)
    this.$store.commit('replaceTheme', this.theme.slug)
    this.$store.commit('disableGlobeAutoRotation')
    this.$store.commit('setBackButtonToHome')
  },
  components: { ChapterList, MenuDropdown, NarrativeHeader }
}
</script>

<style>
.globe-spacer-narrative {
  height: 65vh;
  width: 100vw;
  pointer-events: none;
}

.book-title {
  margin-bottom: 0.5rem;
}
.book-description {
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .book-header {
    max-width: 66%;
  }
  .book-title {
    font-size: 3rem;
  }
  .book-description {
    margin-bottom: 4rem;
  }
}
</style>
