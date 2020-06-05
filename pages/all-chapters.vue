<template>
  <main>
    <ul class="all-chapters__list" v-for="chapter in allChapters" :key="chapter.id">
      <li>
        <article class="chapter-overview">
          <div class="all-chapters__meta">
            <h2 class="all-chapters__title">{{ chapter.title }}</h2>
            <p v-if="chapter.body">{{ chapter.body }}</p>
          </div>

          <page-component
            v-for="page in chapter.pages"
            :key="page.id"
            :page="page"
            :id="page.slug"
            :ref="page.slug"
            :class="['chapter__page']"
          />
        </article>
      </li>
    </ul>
  </main>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import PageComponent from '~/components/page-component/PageComponent'

  export default {
    layout: 'static-page',
    components: {
      PageComponent,
    },
    head() {
      return {
        meta: [ { name: 'robots', content: 'noindex' } ],
      }
    },
    asyncData () {
      return fetchContent(
        `
            {
              allChapters(first: 100, orderBy: _publishedAt_DESC) {
                id
                title
                body
                pages {
                  id
                  body
                  images {
                    title
                    url
                    width
                    height
                    alt
                  }
                  video {
                    width
                    height
                    provider
                    providerUid
                  }
                }
              }
            }
          `
      )
    }
  }
</script>

<style>
  .all-chapters__list {
    margin-top: 4rem;
    list-style: none;
  }

  .all-chapters__meta {
    max-width: 35rem;
    margin: 0 auto;
  }

  .all-chapters__title {
    font-size: 3rem;
    font-weight: bold;
  }
</style>
