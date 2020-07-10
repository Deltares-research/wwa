<template>
  <div class="invert">
    <div class="globe-section layout-section">
      <book-list
        class="layout-section__container"
        :books="availableBooks"
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
    scrollToTop: false,
    components: { BookList, ChapterList },
    computed: {
      ...mapState(['books', 'markerTypes']),
      availableBooks() {
        return this.books.map(book => {
          const filteredChapters = book.chapters.filter(chapter => {
            return this.markerTypes.includes(chapter.slug);
          });

          if (filteredChapters.length) {
            return {
              ...book,
              chapters: filteredChapters,
            };
          }
        }).filter(Boolean);
      },
    },
  };
</script>
