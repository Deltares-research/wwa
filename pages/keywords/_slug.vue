<template>
  <div class="invert">
    <div class="layout-section">
      <div class="layout-section__container">
        <book-header title="Keywords" />
        <ul class="keywords__list list--inline">
          <li
            v-for="keyword in activeKeywords"
            :key="keyword.slug"
          >
            <filter-tag
              :title="keyword.title"
              :url="keyword.unsetLink"
              :is-removable="true"
            />
          </li>
          <li>
            <select
              class="keywords__dropdown"
              @change="updatePath"
            >
              <option
                disabled
                selected
              >
                Select new keyword to add
              </option>
              <option
                v-for="keyword in availableKeywords"
                :key="keyword.slug"
                :value="keyword.slug"
              >
                {{ keyword.title }}
              </option>
            </select>
          </li>
        </ul>
      </div>
    </div>
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
import allKeywords from '~/static/data/keywords/index.json';
import BookHeader from '~/components/book-header/BookHeader';
import ChapterList from '~/components/chapter-list/ChapterList';
import FilterTag from '~/components/filter-tag/FilterTag';
import loadData from '~/lib/load-data';
import { unionByProp } from '~/lib/set-operations';

export default {
  layout: 'globe',
  async asyncData (context) {
    const { params } = context;
    const keywordsFromUrl = (params.slug) ? [].concat(params.slug.split('+')) : [];
    const { results = [], tags: keywords = [] } = await loadData(context, { keywords: keywordsFromUrl });

    return {
      keywords,
      results,
    };
  },
  data () {
    return { allKeywords };
  },
  components: {
    BookHeader, ChapterList, FilterTag,
  },
  computed: {
    activeKeywords () {
      const base = this.$route.path.replace(/(\+?[^/])*(\/?)$/, ''); // remove all tags
      return this.keywords.map(tag => {
        const excludingSelf = this.keywords
          .filter(t => t.slug !== tag.slug)
          .map(t => t.slug)
          .join('+');
        tag.unsetLink = `${base}${excludingSelf}`;
        return tag;
      });
    },
    availableKeywords () {
      // Build available keywords objects from results
      const availableKeywords = this.results
        .reduce((acc, result) => unionByProp(acc, result.keywords, 'slug'), [])
        .filter(keyword => this.activeKeywords.every(active => active.slug !== keyword.slug));

      return (availableKeywords.length) ? availableKeywords : this.allKeywords;
    },
  },
  mounted () {
    this.$store.commit('replaceTheme', 'too-much');
    this.$store.commit('replaceFeatures', this.results);
  },
  methods: {
    updatePath (event) {
      const keywordSlug = event.target.value;
      const currentSlug = this.keywords.map(kewyord => kewyord.slug).join('+');
      this.$router.push(`/keywords/${(currentSlug) ? currentSlug + '+' : ''}${keywordSlug}`);
    },
  },
};
</script>

<style>
.keywords__list {
  margin-bottom: 2rem;
}

.keywords__dropdown {
  color: var(--ui--text);
  background-color: var(--booklet--neutral);
  display: inline-block;
  border-radius: 1rem;
  padding: .25rem 1rem .375rem 1rem;
  margin: .25em 1px .25em -1px;
  appearance: none;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--ui--text--invert);
  background-color: transparent;
  border: none;
  transition: color .25s;
  cursor: pointer;
}

.keywords__dropdown:hover {
  color: var(--ui--text--light);
}
</style>
