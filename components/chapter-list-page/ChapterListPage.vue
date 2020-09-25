<template>
  <div class="invert">
    <div class="layout-section layout-section--background-black">
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
      ...mapState(['chapters', 'markerTypes']),
      filteredChapters () {
        return this.chapters.filter(chapter => this.markerTypes.includes(chapter.slug));
      },
    },
    mounted() {
      this.$store.commit('enableInteraction');
      this.$store.commit('enableGlobeAutoRotation');
    },
    components: { ChapterList },
  };
</script>
