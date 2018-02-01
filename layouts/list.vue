<template>
  <main>
    <globe-component class="globe-component" :activeStory="activeStory" />
    <nuxt class="app" />
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
@import '../components/colors/colors.css';

.globe-component {
  position: fixed;
  z-index: -1;
  top:0;
}

.app {
  position: fixed;
  color: var(--ui--text--invert);
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 20rem;
  max-height: 20vh;
}
</style>
