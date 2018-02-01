<template>
  <main>
    <globe-component class="globe-component" :activeStory="activeStory" />
    <nuxt/>
  </main>
</template>
<script>
import '~/components/typography/typography.css'
import GlobeComponent from '~/components/globe-component/GlobeComponent'

export default {
  data () {
    return {
      activeStory: this.$route.params.slug
    }
  },
  components: {
    GlobeComponent
  }
}
</script>
<style>
  /* normalize (reset to a common default) the stylesheets */
  @import '~normalize.css/normalize.css';
  html {
    padding: 0;
    margin: 0;
  }
  .globe-component {
    position: fixed;
    z-index: -1;
    top:0;
  }
</style>
