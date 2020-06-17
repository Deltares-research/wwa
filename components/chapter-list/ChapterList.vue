<template>
  <div class="chapter-list">
    <ul class="chapter-list__list">
      <li
        class="chapter-list__item"
        v-for="chapter in limitedChapters"
        :key="chapter.slug"
      >
        <nuxt-link
          class="chapter-list__item-link"
          :to="chapter.path"
        >
          <span
            class="chapter-list__cover"
            :class="{'chapter-list__cover--fallback': !chapter.cover}"
          >
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
          </span>
          <span class="chapter-list__item-content">{{ chapter.title }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import sortBy from 'lodash/fp/sortBy';

export default {
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
    coverWidth (cover, maxElementHeight) {
      const heigthFactor = maxElementHeight / cover.value.height;
      return cover.value.width * heigthFactor;
    },
    coverPath (chapter) {
      return `${chapter.cover.imgixHost}${chapter.cover.value.path}?auto=compress`;
    },
  },
};
</script>

<style>
.chapter-list__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.chapter-list__list > * {
  flex: 1;
}

.chapter-list__item {
  display: block;
  position: relative;
  margin-bottom: 1rem;
}

.chapter-list__item:before {
  display: block;
  content: '';
  width: 100%;
  padding-top: 56.25%;
}

.chapter-list__item > * {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.chapter-list__cover {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.chapter-list__cover img {
  transform-origin: center;
  transition: transform 0.20s cubic-bezier(0.8, 0.01, 0.65, 1.01);
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chapter-list__cover-image--horizontal {
  display: inline-block;
}

.chapter-list__cover-image--vertical {
  display: none;
}

.chapter-list__cover--fallback img {
  transform: scale(3);
}

.chapter-list__item-link {
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 20px;
  outline: none;
  background-color: var(--white);
  text-decoration: none;
}

.chapter-list__item-link:hover,
.chapter-list__item-link:focus {
  text-decoration: underline;
}

.chapter-list__item-link:hover img,
.chapter-list__item-link:focus img {
  transform: scale(1.1);
}

.chapter-list__item-link:hover .chapter-list__cover--fallback img,
.chapter-list__item-link:focus .chapter-list__cover--fallback img {
  transform: scale(3.5);
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

.chapter-list__item-content {
  z-index: 1;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 1px 1px 1px var(--primary-blue);
  word-break: break-word;
  hyphens: auto;
}

@media (min-width: 600px) {
  .chapter-list {
    margin: 0 -6px;
  }

  .chapter-list__list {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .chapter-list__item {
    flex-basis: calc(100% / 3 - 14px);
    flex-grow: 0;
  }

  .chapter-list__item {
    margin: 0 7px 14px 7px;
  }

  .chapter-list__item:before {
    padding-top: 136%;
  }

  .chapter-list__item-content {
    font-size: 1.5rem;
  }

  .chapter-list__cover-image--horizontal {
    display: none;
  }

  .chapter-list__cover-image--vertical {
    display: inline-block;
  }

  .chapter-list__gradient {
    top: 50%;
  }
}

@media (min-width: 768px) {
  .chapter-list__item-content {
    word-break: normal;
  }
}
</style>
