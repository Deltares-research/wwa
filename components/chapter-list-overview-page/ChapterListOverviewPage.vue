<template>
  <div class="globe-section layout-section layout-section--background-black invert">
    <ul class="chapter-list-overview-page layout-section__container">
      <template
        v-for="filter in chaptersGroupedByFilter"
      >
        <li
          v-if="filter.chapters.length"
          :key="filter.path"
          class="chapter-list-overview-page__item"
        >
          <h2 class="chapter-list-overview-page__title">
            <nuxt-link
              class="chapter-list-overview-page__title-link"
              :to="`${filter.path}#globe-navigation`"
            >
              {{ filter.title }}
            </nuxt-link>
          </h2>

          <div class="chapter-list-overview-page__content">
            <chapter-list
              :chapters="filter.chapters"
              :limit="3"
            />
          </div>
          <nuxt-link
            class="chapter-list-overview-page__more-link"
            :to="`${filter.path}#globe-navigation`"
          >
            View more {{ filter.title }}
          </nuxt-link>
        </li>
      </template>
    </ul>
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
    components: { ChapterList },
    computed: {
      ...mapState(['filters', 'chapters', 'availableFilterItems']),
      activeFilterSlug () {
        return this.$route.path.split('/')[1] ? this.$route.path.split('/')[1] : this.filters[0].slug;
      },
      activeFilterItemSeo () {
        return this.filters.find(filter => filter.slug === this.activeFilterSlug).seo;
      },
      chaptersGroupedByFilter() {
        const availableFilterItemSlugs =  this.availableFilterItems.map(filterItem => filterItem.slug);

        let output = this.availableFilterItems.reduce(( out, subFilter ) => {
          out[subFilter.slug] = {
            title: subFilter.title,
            path: `/${this.activeFilterSlug}/${subFilter.slug}`,
            chapters: [],
          };
          return out;
        }, {});

        this.chapters.forEach(chapter => {
          availableFilterItemSlugs.forEach(filterItemSlug => {
            if (chapter.filters.includes(filterItemSlug)) {
              output[filterItemSlug].chapters.push(chapter);
            }
          });
        });

        return output;
      },
    },
    mounted () {
      this.$store.commit('disableGlobePositionRight');
    },
  };
</script>

<style>
  .chapter-list-overview-page {
    list-style: none;
    padding: 0px;
  }

  .chapter-list-overview-page__item {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .chapter-list-overview-page__item:last-child {
    margin-bottom: 1rem;
  }

  .chapter-list-overview-page__title {
    flex: 0 0 100%;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    line-height: 1.1;
    font-weight: 500;
  }

  .chapter-list-overview-page__title-link {
    text-decoration: none;
  }

  .chapter-list-overview-page__title-link:hover,
  .chapter-list-overview-page__title-link:focus {
    text-decoration: underline;
  }

  .chapter-list-overview-page__content {
    flex: 0 0 100%;
  }

  .chapter-list-overview-page__more-link {
    display: inline-block;
    padding: 10px 15px;
    background: var(--blue-tertiary);
    font-weight: bold;
    text-decoration: none;
    color: var(--blue-primary);
    border-radius: 5px;
  }

  .chapter-list-overview-page__more-link:hover,
  .chapter-list-overview-page__more-link:focus {
    color: var(--blue-primary);
  }

  @media (--sm-viewport) {
    .chapter-list-overview-page__title {
      font-size: 2rem;
      line-height: 2.25rem;
    }
  }
</style>
