import * as THREE from 'three'

export default {
  data () {
    return {

    }
  },
  mounted () {
    this.createRenderer()
    this.createScene()
  },
  methods: {
    /**
     * Create a renderer in the element
     * @returns {Renderer}
     */
    createRenderer () {
      const renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
        autoClear: false
      })

      // renderer.shadowMap.enabled = true;
      // renderer.shadowMap.renderSingleSided = false;
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(this.$el.innerWidth, this.$el.innerHeight)
      renderer.setClearColor(0x00002A)

      // append the globe canvas to our mounted element
      this.$el.appendChild(renderer.domElement)
    },

    /**
     * Create a scene in the renderer
     * @returns {Scene} Return description.
     */
    createScene () {
      const scene = new THREE.Scene()
      return scene
    }
  }

}
