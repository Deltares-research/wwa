<template>
  <div class="filter-keywords">
    <ul class="list--inline filter-keywords__list">
      <li
        v-for="keyword in keywords"
        :key="keyword.slug"
        @click="handleKeywordClick(keyword.slug)"
      >
        <keyword-tag
          :keyword="keyword"
          :active="activeKeywords.indexOf(keyword.slug) !== -1"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import KeywordTag from '~/components/keyword-tag/KeywordTag'

export default {
  props: {
    keywords: Array,
  },
  data: () => ({
    activeKeywords: [],
  }),
  components: { KeywordTag },
  mounted () {
    this.setAllKeywordsActive()
  },
  methods: {
    handleKeywordClick (slug) {
      if (this.activeKeywords.length === this.keywords.length) {
        this.activeKeywords = this.activeKeywords.filter(keyword => keyword === slug)
        this.$emit('change', this.activeKeywords)
        return
      }

      if (this.activeKeywords.length === 1 && this.activeKeywords[0] === slug) {
        this.setAllKeywordsActive()
        this.$emit('change', this.activeKeywords)
        return
      }

      const keywordIndex = this.activeKeywords.indexOf(slug)
      if (keywordIndex === -1) {
        this.activeKeywords.push(slug)
      } else {
        this.activeKeywords = this.activeKeywords.filter(keyword => keyword !== slug)
      }
      this.$emit('change', this.activeKeywords)
    },
    setAllKeywordsActive () {
      this.keywords.forEach(keyword => {
        if (this.activeKeywords.indexOf(keyword.slug) === -1) {
          this.activeKeywords.push(keyword.slug)
        }
      })
    },
  },
}
</script>

<style>
.filter-keywords {
  width: calc(100vw - 40px);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 20px;
}

.filter-keywords__list {
  margin: 1rem 0;
}

@media (min-width: 600px) {
  .filter-keywords {
    width: calc(100vw - 80px);
    padding: 0 40px;
  }
  .filter-keywords__list {
    width: calc(100vw - 40px);
    max-width: 950px;
    z-index: 1;
  }
}
</style>
