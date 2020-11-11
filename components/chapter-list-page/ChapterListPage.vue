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
  import seoHead from '~/lib/seo-head';
  import { mapState } from 'vuex';
  import ChapterList from '~/components/chapter-list/ChapterList';

  export default {
    layout: 'globe',
    head() {
      return seoHead(this.activeFilterItemSeo, this.$route.path);
    },
    scrollToTop: false,
    computed: {
      ...mapState(['availableFilterItems', 'chapters', 'markerTypes']),
      activeFilterItemSeo () {
        return this.availableFilterItems.find(filter => filter.slug === this.activeFilterItemSlug).seo;
      },
      activeFilterItemSlug () {
        return this.$route.params.slug;
      },
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
