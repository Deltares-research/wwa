<template>
  <nav class="narrative-footer">
    <div
      v-if="related.length"
      class="narrative-footer__related"
    >
      <h3 class="h2">
        Similar Stories
      </h3>
      <ul class="narrative-footer__related-list">
        <li
          v-for="relatedChapter in related"
          :key="relatedChapter.path"
          class="narrative-footer__related-item"
        >
          <nuxt-link
            :to="relatedChapter.path"
            :title="relatedChapter.title"
            class="narrative-footer__related-link"
          >
            <picture>
              <source
                :srcset="`
                  ${relatedChapter.cover.imgixHost}${relatedChapter.cover.value.path}?auto=compress&w=340&h=200&fit=crop 340w,
                  ${relatedChapter.cover.imgixHost}${relatedChapter.cover.value.path}?auto=compress&w=340&h=200&fit=crop&dpr=2 680w,
                  ${relatedChapter.cover.imgixHost}${relatedChapter.cover.value.path}?auto=compress&w=340&h=200&fit=crop&dpr=3 1140w`"
                sizes="100vw"
                media="(max-width: 599px)"
              >
              <source
                :srcset="`
                  ${relatedChapter.cover.imgixHost}${relatedChapter.cover.value.path}?auto=compress&w=340&h=400&fit=crop 340w,
                  ${relatedChapter.cover.imgixHost}${relatedChapter.cover.value.path}?auto=compress&w=340&h=400&fit=crop&dpr=2 680w,
                  ${relatedChapter.cover.imgixHost}${relatedChapter.cover.value.path}?auto=compress&w=340&h=400&fit=crop&dpr=3 1140w`"
                sizes="340px"
                media="(min-width: 600px)"
              >
              <img
                :src="`${relatedChapter.cover.imgixHost}${relatedChapter.cover.value.path}?auto=compress&w=270&h=340&fit=crop&q=65`"
                width="100%"
                class="narrative-footer__related-image"
              >
            </picture>

            <span class="narrative-footer__related-title">
              <small class="narrative-footer__related-book-title">{{ relatedChapter.bookTitle }}</small>
              <br>
              <span class="narrative-footer__related-chapter-title">{{ relatedChapter.title }}</span>
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="narrative-footer__prev-next">
      <nuxt-link
        v-if="previousLink"
        :to="previousLink.path"
        class="h2 narrative-footer__link"
        :title="previousLink.title"
      >
        <span class="sr-only">Continue reading about</span> {{ previousLink.title }}
      </nuxt-link>
      <nuxt-link
        v-if="nextLink"
        :to="nextLink.path"
        class="h2 narrative-footer__link narrative-footer__link--next"
        :title="nextLink.title"
      >
        <span class="sr-only">Continue reading about</span> {{ nextLink.title }}
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    previousLink: {
      type: Object,
      required: false,
    },
    nextLink: {
      type: Object,
      required: false,
    },
    related: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.narrative-footer {
  padding: 2rem;
}

.narrative-footer__prev-next {
  margin: 2.5rem auto 0;
  max-width: 40rem;
  display: flex;
  justify-content: center;
}

.narrative-footer__link {
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 1rem;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  transition: 300ms color ease-in-out;
  white-space: nowrap;
  width: 50%;
}

.narrative-footer__link:hover {
  color: var(--white);
}

.narrative-footer__link::before {
  content: '❮';
  left: 0;
  font-size: 0.5rem;
  position: absolute;
  speak: none;
  top: 8px;
}

.narrative-footer__link--next {
  float: right;
  padding-left: 0;
  padding-right: 1rem;
  text-align: right;
}

.narrative-footer__link--next::before {
  content: '❯';
  right: 0;
  left: auto
}

.narrative-footer {
  max-width: 40rem;
  margin: auto;
}

.narrative-footer__related-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.narrative-footer__related-item {
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
  border-radius: 5px;
  overflow: hidden;
}

.narrative-footer__related-title {
  position: absolute;
  display: inline-block;
  width: calc(100% - 2rem);
  bottom: 0;
  left: 0;
  padding: 1.5rem;
  margin: 0;
  color: var(--white);
  font-weight: bold;
  font-size: 1.5rem;
  background-image: linear-gradient(to bottom, rgba(1, 0, 42, 0), rgba(1, 0, 42, 1));
  box-sizing: border-box;
  width: 100%;
}

.narrative-footer__related-book-title {
  font-weight: normal;
  text-transform: uppercase;
  font-weight: bold;
}

.narrative-footer__related-link img {
  transition: transform  0.20s cubic-bezier(0.8, 0.01, 0.65, 1.01);
}

.narrative-footer__related-link:active img,
.narrative-footer__related-link:focus img,
.narrative-footer__related-link:hover img {
  transform: scale(1.25);
}

.narrative-footer__related-link:active .narrative-footer__related-chapter-title,
.narrative-footer__related-link:focus .narrative-footer__related-chapter-title,
.narrative-footer__related-link:hover .narrative-footer__related-chapter-title {
  text-decoration: underline;
}

@media (--sm-viewport) {
  .narrative-footer__related-item {
    width: 48%;
  }

  .narrative-footer__related-list {
    flex-direction: row;
  }
}

@media print {
  .narrative-footer {
    display: none;
  }
}
</style>
