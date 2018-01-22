import VGlobe from '~/components/VGlobe'

export default {
  data () {
    return {
      activeStory: this.$route.params.slug
    }
  },
  components: {
    VGlobe
  }
}
