<template>
  <div class="invert">
    <div class="globe-section layout-section">
      <book-list
        class="layout-section__container"
        :books="books"
      >
        <chapter-list
          slot-scope="{ chapters, limit }"
          :chapters="chapters"
          sorted="newest"
          :limit="limit"
        />
      </book-list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import BookList from '~/components/book-list/BookList';
import ChapterList from '~/components/chapter-list/ChapterList';

export default {
  layout: 'globe',
  components: { BookList, ChapterList },
  async fetch ({ store }) {
    return await store.dispatch('getBooks');
  },
  computed: {
    ...mapState(['books']),
  },
  mounted () {
    // this.$store.commit('replaceFeatures', []);
    // this.$store.commit('enableInteraction');
    // this.$store.commit('enableGlobeAutoRotation');
    // this.$store.commit('replaceTheme', 'too-much');
    // this.$store.commit('replaceFeatures', this.markers);
    // this.$store.commit('enableGlobeAutoRotation');
  },
};
</script>

<style>
.globe-section {
  padding-top: 1rem;
}

[data-hero-hide-trigger] {
  display: block;
  position: absolute;
  top: 1rem;
  right: 0;
  width: 1px;
  height: 1px;
  background-color: transparent;
  z-index: 1;
}
</style>
