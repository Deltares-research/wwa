import * as THREE from 'three'
// import { MeshLine, MeshLineMaterial } from 'three.meshline'
import { Tween, autoPlay, Easing } from 'es6-tween'
import { cartesian2polar, polar2cartesian, lat2theta, lon2phi } from './common.js'
import { OrbitControls } from './orbit-controls.js'
import { mapState } from 'vuex'

import Glow from './glow'
import Water from './water'
import Avatar from './avatar'
import Particles from './particles'

// const GLOBE_RADIUS = 5
// const WHITE = 0xffffff
const tweenDuration = 1500
const vOffset = 15
const vOffsetFactor = vOffset / 100

export default {
  data () {
    return {
      renderer: null,
      camera: null,
      scene: null,
      controls: null,
      connections: [],
      message: ''
    }
  },
  mounted () {
    try {
      this.renderer = this.createRenderer()
    } catch (err) {
      return
    }
    // this.stats = new Stats()

    this.camera = this.createCamera()
    this.scene = this.createScene()

    this.clock = new THREE.Clock()

    this.controls = new OrbitControls(this.camera, this.globeContainerElement)
    this.controls.enablePan = false
    this.controls.minDistance = 6
    this.controls.maxDistance = 50

    const that = this
    this.controls.addEventListener('change', function () {
      that.$store.commit('enableGlobeAutoRotation', false)
    })

    this.mouse = new THREE.Vector2()
    this.intersections = []

    this.createRaycaster()
    // resize the canvas
    this.handleResize()
    this.animate()

    // window is the event handler fo resize, so we need to subscribe to it
    window.addEventListener(
      'resize',
      this.handleResize
    )

    autoPlay(true)

    this.renderer.domElement.addEventListener(
      'mousemove',
      this.handleMouseMove,
      false
    )

    this.renderer.domElement.addEventListener(
      'click',
      this.handleClick,
      false
    )

    this.activateFeature(this.activeFeature)
    if (this.activateFeature && this.activateFeature.theme) {
      this.theme = this.activateFeature.theme.slug || this.theme
    }
    this.replaceTheme(this.theme)
  },
  watch: {
    activeFeature (val) {
      this.activateFeature(val)
      if (val.theme && val.theme.slug) {
        this.replaceTheme(val.theme.slug)
      }

      this.disableGlobeAutoRotation()
    },
    features (val) {
      this.replaceFeatures(val)
    },
    globeInteraction (val) {
      this.enableInteraction(val)
    },
    theme (val, old) {
      this.replaceTheme(val, old)
      // this.disableGlobeAutoRotation()
    }
  },
  computed: {
    ...mapState({
      activeFeature: state => state.activeFeature,
      features: state => state.features,
      globeInteraction: state => state.interaction,
      theme: state => state.theme,
      globeAutoRotation: state => state.globeAutoRotation
    }),
    containerSize: {
      get () {
        // lookup the size of the globe card element
        let size = [0, 0]
        if (this.globeContainerElement != null) {
          size = [
            this.globeContainerElement.clientWidth,
            this.globeContainerElement.clientHeight
          ]
        }
        return size
      },
      cache: false
    },
    globeContainerElement: {
      // lookup the globe element
      get () {
        let el = this.$el
        return el
      },
      cache: false
    },
    globeElement: {
      // lookup the globe element
      get () {
        let el = null
        if (this.$el != null) {
          el = this.$el.querySelector('.globe')
        }
        return el
      },
      cache: false
    }

  },
  methods: {
    activateFeature (feature) {
      if (!(feature) || !(feature.location)) {
        return
      }
      this.connections = this.features.map(d => {
        if (!d.location || d.location === null) {
          return
        }

        return {
          from: {
            lat: feature.location.lat,
            lon: feature.location.lon
          },
          to: {
            lat: d.location.lat,
            lon: d.location.lon
          }
        }
      })

      // by default use camera position
      // We use the phi, theta notation, as used in
      // https://en.wikipedia.org/wiki/Spherical_coordinate_system
      const from = cartesian2polar(this.camera.position.x, this.camera.position.y, this.camera.position.z)
      const to = {}
      to.theta = lat2theta(feature.location.lat)
      to.phi = lon2phi(feature.location.lon)
      to.r = 40 - feature.location.zoom
      this.panAndZoom(from, to)
    },
    /**
     * Animates the particles on the globe to the colors associated with the provided theme slug.
     * @param {String} slug one of the theme slugs: too-little, too-much or too-dirty
     */
    replaceTheme (slug) {
      this.particles.replaceTheme(slug)
    },
    enableInteraction (val) {
      if (!(this.controls)) {
        return
      }
      this.controls.enableRotate = val
      this.controls.enableZoom = val
    },
    replaceFeatures (features) {
      const globe = this.globe
      const filteredFeatures = features.filter(feature => feature.location)
      this.avatar.clear()
      this.avatar.load(filteredFeatures, avs => globe.add(avs))
    },
    handleResize () {
      // We're getting the containerSize here because the size
      // of the canvas itself is not changing on screen resize
      const width = this.containerSize[0]
      const height = this.containerSize[1]
      const renderWidth = this.containerSize[0]
      const renderHeight = this.containerSize[1] * (1 + vOffsetFactor)

      this.particles.handleResize(renderHeight)

      // reset the aspect ratio
      this.camera.aspect = renderWidth / renderHeight
      // recompute projection
      this.camera.updateProjectionMatrix()
      // set the size to the rederer
      this.renderer.setSize(width, height)
      // clear the screen
      this.renderer.clear()
      // redraw
      // this.renderer.render(this.scene, this.camera)
    },
    handleClick (event) {
      if (this.intersections.length > 0) {
        const { data = { path: '#' } } = this.intersections[0].object
        // navigate to path
        this.$router.push(data.path)
      }
    },
    handleMouseMove (event) {
      event.preventDefault()

      this.mouse.x = ((event.clientX / this.renderer.domElement.clientWidth) * 2) - 1
      this.mouse.y = -((event.clientY / this.renderer.domElement.clientHeight) * 2) + 1
    },
    /**
     * Pan to the active story
     */
    panAndZoom (from, to) {
      const tween = new Tween(from)
        .to(to, tweenDuration)
        .on('update', ({ r, theta, phi }) => {
          const cart = polar2cartesian(r, theta, phi)
          this.camera.position.set(cart.x, cart.y, cart.z)
          this.camera.lookAt(new THREE.Vector3(0, 0, 0))
        })
        .easing(Easing.Cubic.InOut)

      tween.start()
    },
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

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x00002A)

      // append the globe canvas to our mounted element
      this.globeElement.appendChild(renderer.domElement)
      return renderer
    },

    /**
     * Create a scene
     * @returns {Scene} Scene with a sphere
     */
    createScene () {
      // minimal scene (TODO: append real globe)
      const scene = new THREE.Scene()

      const globe = new THREE.Object3D()
      this.globe = globe
      globe.position.set(0, 0, 0)

      this.particles = new Particles({current: this.theme, target: this.theme})
      this.particles.load(() => this.particles.update())
      globe.add(this.particles.mesh)

      this.water = new Water()
      globe.add(this.water.mesh)

      const glow = new Glow(this.camera)
      globe.add(glow.mesh)

      // get the baseUrl
      const { base = '/' } = this.$router.options
      this.avatar = new Avatar(base)
      this.avatar.load(this.features, avs => globe.add(avs))

      scene.add(globe)

      const light = new THREE.AmbientLight(0xffffff)
      scene.add(light)

      const dirLight = new THREE.DirectionalLight(0xffaa66, 4.2)
      dirLight.position.set(15, 13, 15)

      return scene
    },
    disableGlobeAutoRotation () {
      this.globeAutoRotate = false
    },
    /**
     * Creates a raycaster for detecting mouseover over avatars
     * @return {THEE.Raycaster} a THREE Raycaster
     */
    createRaycaster () {
      this.raycaster = new THREE.Raycaster()
      this.raycaster.params.Points.threshold = 0.4
    },

    /**
     * Create a camera object that looks at the scene
     * @param {Scene} scene - scene (used to look at).
     * @returns {Camera} Camera, looking at the scene.
     */
    createCamera () {
      const width = this.containerSize[0]
      const height = this.containerSize[1]
      const renderWidth = this.containerSize[0]
      const renderHeight = this.containerSize[1] * (1 + vOffsetFactor)
      const camera = new THREE.PerspectiveCamera(30, renderWidth / renderHeight, 0.1, 300)

      // lat, lon in radians
      const theta = lat2theta(40)
      const phi = lon2phi(40)
      const point = polar2cartesian(40, theta, phi)
      camera.position.x = point.x
      camera.position.y = point.y
      camera.position.z = point.z

      // TODO: somehow z is upside down, check why this is
      camera.up = new THREE.Vector3(0, 0, -1)

      // set aspect ratio
      camera.setViewOffset(renderWidth, renderHeight, 0, height * vOffsetFactor, width, height)
      return camera
    },

    /**
     * Render and animate the scene.
     * @return {[type]} [description]
     */
    animate () {
      requestAnimationFrame(this.animate)

      if (this.globeAutoRotation) {
        const { r, theta, phi } = cartesian2polar(this.camera.position.x, this.camera.position.y, this.camera.position.z)
        const point = polar2cartesian(r, theta, phi + 0.001)
        this.camera.position.x = point.x
        this.camera.position.y = point.y
        this.camera.position.z = point.z
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      }

      this.water.uniforms.time.value += (this.clock.getDelta() * 0.1)
      this.particles.uniforms.time.value += 0.4

      this.raycaster.setFromCamera(this.mouse, this.camera)
      this.intersections = this.raycaster.intersectObjects(this.avatar.mesh.children)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
