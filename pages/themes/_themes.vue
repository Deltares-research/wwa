<template>
  <div class="invert">
    <div class="layout-section">
      <div class="layout-section__container">
        <book-header
          :title="title"
          :body="htmlBody"
        />
      </div>
    </div>
    <div
      class="layout-section"
      :class="`layout-section--theme-${slug}-active`"
    >
      <div class="layout-section__container">
        <chapter-list
          :chapters="entries"
          sorted="newest"
          :limit="32"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BookHeader from '~/components/book-header/BookHeader';
import ChapterList from '~/components/chapter-list/ChapterList';
import loadData from '~/lib/load-data';
import marked from '~/lib/marked';

export default {
  layout: 'globe',
  async asyncData (context) {
    const themes = loadData(context, { theme: 'index' });
    const { slug, entries, title, body } = await loadData(context, context.params);
    return {
      slug,
      entries,
      title,
      body,
      themes: await themes,
    };
  },
  computed: {
    htmlBody () {
      return marked(this.body);
    },
  },
  mounted () {
    this.$store.commit('replaceFeatures', this.entries);
    this.$store.commit('replaceTheme', this.$route.params.themes);
    this.$store.commit('enableGlobeAutoRotation');
  },
  components: { BookHeader, ChapterList },
};
</script>

