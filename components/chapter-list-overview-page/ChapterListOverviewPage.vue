<template>
  <div class="globe-section layout-section invert">
    <ul class="book-list layout-section__container">
      <li class="book-list__item" v-for="filter in chaptersGroupedByFilter">
        <h2 class="book-list__book-title">
          <nuxt-link
            class="book-list__book-title-link"
            :to="filter.path"
          >
            {{ filter.title }}
          </nuxt-link>
        </h2>

        <div class="book-list__content">
          <chapter-list :chapters="filter.chapters" :limit="3" />
        </div>
        <nuxt-link
          class="book-list__more-link"
          :to="filter.path"
        >
          View more {{ filter.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ChapterList from '~/components/chapter-list/ChapterList';

  export default {
    layout: 'globe',
    scrollToTop: false,
    components: { ChapterList },
    computed: {
      ...mapState(['chapters', 'navigationLinks', 'filters']),
      chaptersGroupedByFilter() {
        const slug = this.$route.path.split('/')[1] ? this.$route.path.split('/')[1] : this.filters[0].slug;
        const availableFilters = this.filters.find(filter => filter.slug === slug);
        const availableFilterItems =  availableFilters ? availableFilters.filterItems : [];
        const availableFilterItemSlugs =  availableFilterItems.map(filterItem => filterItem.slug)

        let output = availableFilterItems.reduce(( out, subFilter ) => {
          out[subFilter.slug] = {
            title: subFilter.title,
            path: `/${this.$route.name}/${subFilter.slug}`,
            chapters: [],
          };
          return out;
        }, {});

        this.chapters.forEach(chapter => {
          availableFilterItemSlugs.forEach(filterItemSlug => {
            if (chapter.filters.includes(filterItemSlug)) {
              output[filterItemSlug].chapters.push(chapter);
            }
          })
        })

        return output
      },
    },
  };
</script>

<style>
  .book-list {
    list-style: none;
    padding: 0px;
  }

  .book-list__item {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .book-list__item:last-child {
    margin-bottom: 1rem;
  }

  .book-list__book-title {
    flex: 0 0 100%;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    line-height: 1.1;
    font-weight: 500;
  }

  .book-list__book-title-link {
    text-decoration: none;
  }

  .book-list__book-title-link:hover,
  .book-list__book-title-link:focus {
    text-decoration: underline;
  }

  .book-list__content {
    flex: 0 0 100%;
  }

  .book-list__more-link {
    display: inline-block;
    padding: 10px 15px;
    background: var(--blue-tertiary);
    font-weight: bold;
    text-decoration: none;
    color: var(--blue-primary);
    border-radius: 5px;
  }

  .book-list__more-link:hover,
  .book-list__more-link:focus {
    color: var(--blue-primary);
  }

  @media (--sm-viewport) {
    .book-list__book-title {
      font-size: 2rem;
      line-height: 2.25rem;
    }

    .book-list__more {
      margin-top: 0;
    }
  }
</style>
