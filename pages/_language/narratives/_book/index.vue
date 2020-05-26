<template>
  <div class="invert">
    <div class="globe-spacer-narrative"/>
    <div class="layout-section">
      <div class="layout-section__container">
        <div class="book-header">
          <h1 class="book-title">{{ book.title }}</h1>
          <p
            v-if="book.body.length"
            class="book-description"
          >
            {{ book.body }}
          </p>
        </div>
      </div>
    </div>
    <div class="layout-section layout-section--gradient">
      <div class="layout-section__container">
        <chapter-list :chapters="book.chapters" :path="path" sorted="newest" :limit="9" />
      </div>
    </div>
    <portal to="menu-center-content">
      <transition name="fade">
        <menu-dropdown :book="book" :booksList="allBooks" :path="path" />
      </transition>
    </portal>
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import ChapterList from '~/components/chapter-list/ChapterList'
  import MenuDropdown from '~/components/menu-dropdown/MenuDropdown'

  export default {
      components: {
        ChapterList,
        MenuDropdown,
      },
      async asyncData ({ params, route }) {
        const query = `
          {
            allBooks {
              slug
              title
            }

            book(locale: ${params.language}, filter: { slug: { eq: "${params.book}" } }) {
              slug
              title
              body

              chapters {
                updatedAt
                slug
                title
                cover {
                  responsiveImage {
                    src
                  }
                }
              }
            }
          }
        `;

        return {
          ...await fetchContent(query),
          path: route.path,
        }
      }
  }
</script>

<style>
  .globe-spacer-narrative {
    height: 65vh;
    width: 100vw;
    pointer-events: none;
  }

  .book-title {
    margin-bottom: 0.5rem;
  }
  .book-description {
    margin-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    .book-header {
      max-width: 66%;
    }
    .book-title {
      font-size: 3rem;
    }
    .book-description {
      margin-bottom: 4rem;
    }
  }
</style>
