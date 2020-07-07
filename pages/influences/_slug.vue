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
  import getFilteredChaptersByFilter from '~/lib/get-filtered-chapters-by-filter';
  import ChapterList from '~/components/chapter-list/ChapterList';

  export default {
    layout: 'globe',
    async fetch ({ store }) {
      return await store.dispatch('getBooks');
    },
    computed: {
      ...mapState(['books']),
      filteredChapters () {
        return getFilteredChaptersByFilter(this.books, this.$route.params.slug);
      },
    },
    mounted () {
      this.$store.commit('replaceTheme', 'too-much');
      this.$store.commit('replaceFeatures', this.filteredChapters);
      this.$store.commit('enableGlobeAutoRotation');
    },
    components: { ChapterList },
  };
</script>
