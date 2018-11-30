<template>
  <div class="invert">
    <div class="globe-spacer-narrative"/>
    <div class="page-index__chapter-list-wrapper">
      <div class="page-index__chapter-list">
        <div class="book-header">
          <h1 class="book-title">{{ title }}</h1>
          <p class="book-description">A short sentence about {{ title }}. Why we have this theme and what is so important about all the chapters in this book.</p>
        </div>
      </div>
    </div>
    <div class="page-index__chapter-list-wrapper page-index__chapter-list-wrapper--gradient">
      <div class="page-index__chapter-list">
        <chapter-list :chapters="chapters" sorted="newest" :limit="9" />
      </div>
    </div>
    <portal to="menu-center-content">
      <transition name="fade">
        <menu-dropdown v-bind:book="{ title }" v-bind:booksList="booksList" />
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
    const { title, chapters, theme } = await loadData(context, context.params)
    return { booksList, title, chapters, themes: await themes, theme }
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.chapters)
    this.$store.commit('replaceTheme', this.theme.slug)
    this.$store.commit('disableGlobeAutoRotation')
  },
  components: { ChapterList, MenuDropdown, NarrativeHeader }
}
</script>

<style>
.globe-spacer-narrative {
  height: 50vh;
  width: 100vw;
  pointer-events: none;
}

.page-index__scroll-to-wrapper {
  width: calc(100vw - 40px);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 20px;
}

.page-index__scroll-to-wrapper--margin-bottom {
  margin-bottom: 2rem;
}

.page-index__scroll-to-button {
  color: var(--ui-invert);
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  cursor: pointer;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.23);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
}

.page-index__scroll-to-button:hover {
  background-color: var(--ui--blue);
  box-shadow: 0px 0px 50px 0px rgba(152, 171, 186, 0.75);
}

.page-index__button-icon {
  fill: var(--ui--white);
  display: block;
}

.page-index__chapter-list-wrapper {
  width: calc(100vw - 40px);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 20px;
}

.page-index__chapter-list-wrapper--gradient:before {
  content: '';
  display: block;
  width: 100%;
  height: calc(100% + 30vh);
  top: 0;
  transform: translateY(-30vh);
  position: absolute;
  background-image: linear-gradient(to bottom, rgba(0, 0, 42, 0) 0, rgba(0, 0, 42, 0.85) 30vh);
  pointer-events: none;
  z-index: -1;
}

.page-index__chapter-list {
  width: calc(100vw - 40px);
  max-width: 950px;
  z-index: 1;
}

@media (min-width: 600px) {
  .page-index__chapter-list-wrapper {
    width: calc(100vw - 80px);
    padding: 0 40px;
  }
}

.book-header {

}
.book-title {
  margin-bottom: 0.5rem;
}
.book-description {
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .book-header {
    max-width: 50%;
  }
  .book-title {
    font-size: 3rem;
  }
  .book-description {
    margin-bottom: 4rem;
  }
}
</style>
