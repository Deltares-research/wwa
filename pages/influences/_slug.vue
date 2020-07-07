<template>
  <div class="invert">
    <div class="layout-section">
      <div class="layout-section__container">
        <chapter-list
          :chapters="results"
          sorted="newest"
          :limit="20"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChapterList from '~/components/chapter-list/ChapterList';

export default {
  layout: 'globe',
  async fetch ({ store }) {
    return await store.dispatch('getBooks');
  },
  computed: {
    ...mapState(['books']),
    results () {
      return this.books.length
        ? this.books.map(book => {
          return book.chapters.filter(chapter => {
            return chapter.filters.includes(this.$route.params.slug)
            })
        })
        .filter(filteredBooks => Boolean(filteredBooks.length))
        .flat()
        : []
    },
  },
  mounted () {
    this.$store.commit('replaceTheme', 'too-much');
    this.$store.commit('replaceFeatures', this.results);
    this.$store.commit('enableGlobeAutoRotation');
  },
  components: { ChapterList },
};
</script>
