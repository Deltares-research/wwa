<template>
  <div class="invert">
    <div class="keywords__header layout-section">
      <div class="layout-section__container">
        <h1>Keywords</h1>
      </div>
    </div>

    <div class="layout-section layout-section--background-black">
      <div class="layout-section__container">
        <ul class="keywords__list list--inline">
          <li
            v-for="keyword in activeKeywords"
            :key="keyword.slug"
          >
            <filter-tag
              :title="keyword.title"
              :slug="keyword.slug"
              :active-keyword-slugs="activeKeywordSlugs"
              :is-removable="true"
            />
          </li>
          <li v-if="availableKeywords.length">
            <select
              class="keywords__dropdown"
              aria-label="Select keyword"
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
  import FilterTag from '~/components/filter-tag/FilterTag';

  export default {
    layout: 'globe',
    async asyncData () {
      const data = await import('~/static/data/keywords/index.json');
      return data.default;
    },
    head() {
      return seoHead(this.seo, this.$route.path);
    },
    data () {
      return {
        activeKeywordSlugs: [],
      };
    },
    created() {
      const activeKeywordsFromUrl = this.$route.path.split('/')[2];
      this.activeKeywordSlugs = activeKeywordsFromUrl ? [].concat(activeKeywordsFromUrl.split('+')) : [];
      this.$store.commit('setMarkerTypes', this.activeKeywordSlugs);
    },
    components: {
      ChapterList,
      FilterTag,
    },
    computed: {
      ...mapState(['chapters']),
      filteredChapters() {
        return this.chapters.filter(chapter => {
          return this.activeKeywordSlugs.every(keyword => chapter.keywords.includes(keyword));
        });
      },
      activeKeywords () {
        return this.keywords.filter(keyword => this.activeKeywordSlugs.includes(keyword.slug));
      },
      availableKeywords () {
        if (this.activeKeywordSlugs.length) {
          const availableKeywordSlugs = this.filteredChapters.filter(chapter => {
            return this.activeKeywordSlugs.every(keyword => {
              return chapter.keywords ? chapter.keywords.includes(keyword) : false;
            });
          }).map(chapter => chapter.keywords)
            .flat()
            .filter(keyword => !this.activeKeywordSlugs.includes(keyword));
          const uniqueKeywordSlugs = Array.from(new Set(availableKeywordSlugs));

          return this.keywords.filter(keyword => uniqueKeywordSlugs.includes(keyword.slug));
        } else {
          return this.keywords;
        }
      },
    },
    mounted () {
      this.$store.commit('disableGlobePositionRight');
      this.$store.commit('resetTheme');
      this.$store.commit('enableInteraction');
      this.$store.commit('enableGlobeAutoRotation');
    },
    methods: {
      updatePath (event) {
        const keywordSlug = event.target.value;
        const newActiveKeywordSlugs = this.activeKeywordSlugs.concat([keywordSlug]).join('+');

        this.$router.push(`/keywords/${newActiveKeywordSlugs}`);
      },
    },
  };
</script>

<style>
  .keywords__header {
    padding: 2rem 0 1rem 0;
    background: linear-gradient(180deg, rgba(8, 8, 8, 0) 0%, rgba(8, 8, 8, 1) 100%);
  }

  .keywords__list {
    margin-bottom: 2rem;
  }

  .keywords__dropdown {
    color: var(--black-secondary);
    background-color: var(--black-secondary);
    display: inline-block;
    border-radius: 1rem;
    padding: .25rem 1rem .375rem 1rem;
    margin: .25em 1px .25em -1px;
    appearance: none;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--white);
    background-color: transparent;
    border: none;
    transition: color .25s;
    cursor: pointer;
  }

  .keywords__dropdown:hover {
    color: var(--blue-tertiary);
  }
</style>
