<template>
  <section class="layout-section">
    <div class="layout-section__container layout-section__container--padded">
      <h1 class="features__title">
        Features
      </h1>

      <ul class="features__content">
        <li
          v-for="feature in allFeatures"
          :key="feature.slug"
          class="features__content-item"
        >
          <div class="features__icon">
            <img
              :src="feature.icon.url"
              alt=""
            >
          </div>
          <nuxt-link :to="`/features/${feature.slug}`">
            {{ feature.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';

  export default {
    layout: 'static-page-dark',
    async asyncData () {
      const query = `
          {
            allFeatures {
              slug
              title
              icon {
                url
              }
            }
          }
        `;

      return {
        ...await fetchContent(query),
      };
    },
  };
</script>

<style>
  .features__title {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 900;
    line-height: 1.2;
    color: var(--blue-tertiary);
  }

  @media (--md-viewport) {
    .features__title {
      margin-bottom: 2rem;
      font-size: 3.75rem;
    }
  }

  .features__content {
    list-style: none;
  }

  .features__content-item {
    display: flex;
    margin-bottom: 1rem;
  }

  .features__icon {
    flex: 0 0 30px;
  }

  .features__icon img {
    height: 20px;
  }
</style>
