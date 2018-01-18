<template>
  <Globe :activeStory="slug" />
</template>

<script>
  import VGlobe from '~/components/VGlobe'

  export default {
    asyncData ({ params }) {
      return { slug: params.slug }
    },
    components: {
      VGlobe
    }
  }
</script>
