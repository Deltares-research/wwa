<template>
  <Globe :activeStory="slug" />
</template>

<script>
  import Globe from '~/components/Globe'

  export default {
    asyncData ({ params }) {
      return { slug: params.slug }
    },
    components: {
      Globe
    }
  }
</script>
