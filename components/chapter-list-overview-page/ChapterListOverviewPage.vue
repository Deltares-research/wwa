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
  import { mapGetters, mapState } from 'vuex';

  import BookList from '~/components/book-list/BookList';
  import ChapterList from '~/components/chapter-list/ChapterList';

  export default {
    layout: 'globe',
    scrollToTop: false,
    components: { BookList, ChapterList },
    computed: {
      ...mapGetters(['availableFilterItems']),
      ...mapState(['books']),
      availableBooks() {
        const availableFilterItemSlugs = this.availableFilterItems.map(category => category.slug);
        return this.books.map(book => {
          const filteredChapters = book.chapters.filter(chapter => {
            return chapter.filters.some(categorySlug => availableFilterItemSlugs.includes(categorySlug));
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
