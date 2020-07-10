<template>
  <div class="invert">
    <div class="layout-section">
      <div class="layout-section__container">
        <chapter-list
          :chapters="filteredChapters"
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
    scrollToTop: false,
    computed: {
      ...mapState(['books', 'markerTypes']),
      filteredChapters () {
        return this.books.map(book => {
          return book.chapters.filter(chapter => this.markerTypes.includes(chapter.slug));
        })
          .flat();
      },
    },
    mounted() {
      this.$store.commit('enableInteraction');
      this.$store.commit('enableGlobeAutoRotation');
    },
    components: { ChapterList },
  };
</script>
