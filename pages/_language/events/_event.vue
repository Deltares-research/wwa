<template>
  <h2 class="event__title">{{ event.title }}</h2>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';

  export default {
    layout: 'empty',
    asyncData({ params }) {
      return fetchContent(`
        {
          event(locale: ${params.language}, filter: { slug: { eq: "${params.event}" } }) {
            slug
            title
          }
        }
      `)
    }
  }
</script>

<style>
  .event__title {
    display: flex;
    justify-content: center;
    color: white;
    font-size: 4rem;
  }
</style>
