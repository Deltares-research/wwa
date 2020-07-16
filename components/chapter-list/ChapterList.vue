<template>
  <ul class="chapter-list">
    <li
      class="chapter-list__item"
      v-for="chapter in limitedChapters"
      :key="chapter.slug"
    >
      <nuxt-link
        class="chapter-list__item-link"
        :to="chapter.path"
      >
        <lazy-media>
          <picture v-if="chapter.cover">
            <source
              :srcset="`${coverPath(chapter)}&w=280&h=158&fit=crop 280w,
                      ${coverPath(chapter)}&w=360&h=202&fit=crop 360w,
                      ${coverPath(chapter)}&w=460&h=259&fit=crop 460w,
                      ${coverPath(chapter)}&w=559&h=314&fit=crop 559w,
                      ${coverPath(chapter)}&w=559&h=314&fit=crop&dpr=2 1118w,
                      ${coverPath(chapter)}&w=559&h=314&fit=crop&dpr=3 1677w`"
              sizes="100vw"
              media="(max-width: 599px)"
            >
            <source
              :srcset="`${coverPath(chapter)}&w=157&h=232&fit=crop 157w,
                      ${coverPath(chapter)}&w=190&h=282&fit=crop 190w,
                      ${coverPath(chapter)}&w=223&h=331&fit=crop 223w,
                      ${coverPath(chapter)}&w=240&h=356&fit=crop 240w,
                      ${coverPath(chapter)}&w=283&h=420&fit=crop 283w,
                      ${coverPath(chapter)}&w=283&h=420&fit=crop&dpr=2 566w,
                      ${coverPath(chapter)}&w=283&h=420&fit=crop&dpr=3 849w,`"
              sizes="(min-width: 1024px) 17.6875rem, 26vw"
              media="(min-width: 600px)"
            >
            <img
              :src="`${coverPath(chapter)}&w=157&h=232&fit=crop`"
              alt=""
            >
          </picture>
          <img
            v-else
            :src="`/assets/${chapterTheme(chapter)}.svg`"
            alt=""
          >
        </lazy-media>
        <span class="chapter-list__item-content">{{ chapter.title }}</span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  import sortBy from 'lodash/fp/sortBy';
  import LazyMedia from '~/components/lazy-media/LazyMedia';

  export default {
    components: { LazyMedia },
    props: {
      chapters: {
        type: Array,
        default: () => [],
      },
      sorted: {
        type: String,
        default: '',
        validator (value) {
          return ['', 'newest'].indexOf(value) !== -1;
        },
      },
      limit: {
        type: Number,
        default: -1, // default all?
      },
      theme: {
        type: String,
      },
    },
    computed: {
      newestChapters () {
        return sortBy(['updatedAt'], this.chapters).reverse();
      },
      sortedChapters () {
        switch (this.sorted) {
          case 'newest':
            return this.newestChapters;
          default:
            return this.chapters;
        }
      },
      limitedChapters () {
        return this.sortedChapters.filter((_, index) => index + 1 <= this.limit);
      },
    },
    methods: {
      chapterTheme (chapter) {
        try {
          return chapter.theme.slug;
        } catch (e) {
          return 'too-dirty';
        }
      },
      c (cover, maxElementHeight) {
        const heigthFactor = maxElementHeight / cover.value.height;
        return cover.value.width * heigthFactor;
      },
      coverPath (chapter) {
        return `${chapter.cover.imgixHost}${chapter.cover.value.path}?auto=compress,format`;
      },
    },
  };
</script>

<style>
  .chapter-list {
    list-style: none;
    padding: 0;
  }

  .chapter-list__item-link {
    display: block;
    position: relative;
    height: 0;
    overflow: hidden;
    padding-bottom: 56.1111111111%;
    margin-bottom: 1rem;

    background-color: var(--blue-secondary);
    text-decoration: none;
  }

  @media all and (min-width: 600px) {
    .chapter-list__item-link {
      padding-bottom: 147.7707006369%;
    }
  }

  .chapter-list__item-link:hover,
  .chapter-list__item-link:focus {
    text-decoration: underline;
  }

  .chapter-list__item-link:hover img,
  .chapter-list__item-link:focus img {
    transform: scale(1.1);
  }

  .chapter-list__item-link:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .1);
  }

  .chapter-list__item-link:after {
    content: '';
    display: block;
    position: absolute;
    top: 25%;
    bottom: -1px;
    left: -1px;
    right: -1px;
    z-index: 0;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 68%, rgba(0, 0, 0, 0.7) 100%);
  }

  .chapter-list__item-link img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: inherit;

    transform-origin: center;
    transition: transform 0.20s cubic-bezier(0.8, 0.01, 0.65, 1.01);
  }

  .chapter-list__item-content {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 1px 1px 1px var(--blue-primary);
    word-break: break-word;
    hyphens: auto;
    padding: 20px;
  }

  @media (--sm-viewport) {
    .chapter-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -6px;
    }

    .chapter-list__item {
      width: calc(100% / 3);
    }

    .chapter-list__item-link {
      margin: 0 7px 14px 7px;
    }

    .chapter-list__item-content {
      font-size: 1.5rem;
    }
  }
</style>
