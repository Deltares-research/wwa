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
import loadData from '~/lib/load-data';
import marked from '~/lib/custom-marked';
import flattenDeep from 'lodash/flattenDeep';
import home from '~/static/data/home.json';

import BookList from '~/components/book-list/BookList';
import ChapterList from '~/components/chapter-list/ChapterList';

export default {
  layout: 'globe',
  components: { BookList, ChapterList },
  async asyncData (context) {
    const books = await loadData(context, { book: 'index' });

    const chaptersNested = await Promise.all([
      ...books.map(book => {
        return book.chapters.map(chapter => {
          return loadData(context,
            {
              chapter: {
                path: `books/${book.slug}/chapters/${chapter.slug}/index.json`,
              },
            });
        });
      }),
    ]);

    const chaptersFlattend = flattenDeep(chaptersNested);
    const chapters = await Promise.all(chaptersFlattend);
    const markers = flattenDeep(chapters.map(chapter => chapter.pages))
      .filter(page => page.location && page.theme && page.path);

    return { books, markers };
  },
  data: function () {
    return {
      body: marked(home.body),
      slug: '',
    };
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.markers);
    this.$store.commit('enableInteraction');
    this.$store.commit('enableGlobeAutoRotation');
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
