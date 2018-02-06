import * as THREE from 'three'
import { Tween, autoPlay, Easing } from 'es6-tween'
import { cartesian2polar, polar2cartesian, lat2rad, lon2rad } from './common.js'
import { OrbitControls } from './orbit-controls.js'

// get the markers exported by dato
import markers from 'static/data/globeMarkers.json'

import Glow from './glow'
import Water from './water'
import Avatar from './avatar'
import State from './state'
import Particles from './particles'

const assetsRoot = 'https://www.datocms-assets.com'

const GLOBE_RADIUS = 5
const WHITE = new THREE.Color(0xffffff)
const vOffset = 15
const vOffsetFactor = vOffset / 100

export default {
  data () {
    return {
      renderer: null,
      camera: null,
      scene: null,
      controls: null,
      message: ''
    }
  },
  props: {
    activeMarker: {
      type: Object,
      required: false
    },
    markers: {
      type: Array,
      default () {
        return markers
      }
    },
    connections: {
      type: Array,
      default () {
        const connections = []
        for (var i = 0; i < 100; i++) {
          // Based on this example https://brunodigiuseppe.wordpress.com/2015/02/14/flight-paths-with-threejs/
          const from = {lat: Math.random() * 180 - 90, lon: Math.random() * 360}
          const to = {lat: 0, lon: 0}
          const record = {from, to}
          connections.push(record)
        }
        return connections
      }
    }
  },
  mounted () {
    try {
      this.renderer = this.createRenderer()
    } catch (err) {
      const fallbackElement = this.$el.querySelector('.fallback')
      fallbackElement.classList.remove('hidden')
      return
    }

    // this.stats = new Stats()

    this.camera = this.createCamera()
    this.scene = this.createScene()

    this.controls = new OrbitControls(this.camera, this.globeContainerElement)

    this.mouse = new THREE.Vector2()
    this.intersections = []

    this.createRaycaster()
    this.addCurves()
    // resize the canvas
    this.handleResize()
    this.animate()
    this.panAndZoom()

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
  },
  computed: {
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
  watch: {
    activeMarker (newMarker, oldMarker) {
      this.panAndZoom()
    }
  },
  methods: {
    handleResize () {
      // We're getting the containerSize here because the size
      // of the canvas itself is not changing on screen resize
      const width = this.containerSize[0]
      const height = this.containerSize[1]
      const renderWidth = this.containerSize[0]
      const renderHeight = this.containerSize[1] * (1 + vOffsetFactor)
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
      console.log('intersections', this.intersections)
      if (this.intersections.length > 0) {
        const { data } = this.intersections[0].object
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
    panAndZoom () {
      if (this.activeMarker && this.activeMarker.location) {
        const { lat, lng, zoom } = this.activeMarker.location
        // convert to radians
        const θ = lat2rad(lat)
        const φ = lon2rad(lng)
        const radius = 40 - zoom

        const from = cartesian2polar(this.camera.position.x, this.camera.position.y, this.camera.position.z)
        const to = { radius, latitude: θ, longitude: φ }
        const tween = new Tween(from)
        tween
          .to(to, 3000)
          .on('update', ({ radius, latitude, longitude }) => {
            const cart = polar2cartesian(radius, θ, φ)
            this.camera.position.set(cart.x, cart.y, cart.z)
            this.camera.lookAt(new THREE.Vector3(0, 0, 0))
          })
          .on('complete', () => {
          })
          .easing(Easing.Cubic.InOut)

        tween.start()
      } else {
        console.log('no active marker, not panning')
      }
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
      // renderer.setSize(window.innerWidth, window.innerHeight);
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
      globe.position.set(0, 0, 0)

      const state = new State() // TODO: this should be done differently
      const particles = new Particles(state)
      particles.load(() => particles.update())
      globe.add(particles.mesh)

      const water = new Water()
      globe.add(water.mesh)

      const glow = new Glow(this.camera)
      globe.add(glow.mesh)

      // get the baseUrl
      const { base = '/' } = this.$router.options

      this.avatar = new Avatar(markers, base)
      this.avatar.load(avs => globe.add(avs))

      scene.add(globe)

      const light = new THREE.AmbientLight(0xffffff)
      scene.add(light)

      const dirLight = new THREE.DirectionalLight(0xffaa66, 4.2)
      dirLight.position.set(15, 13, 15)
      return scene
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
      const θ = lat2rad(40)
      const φ = lon2rad(40)
      const point = polar2cartesian(40, θ, φ)
      camera.position.x = point.x
      camera.position.y = point.y
      camera.position.z = point.z

      // TODO: somehow z is upside down, check why this is
      camera.up = new THREE.Vector3(0, 0, -1)

      // set aspect ratio
      camera.setViewOffset(renderWidth, renderHeight, 0, height * vOffsetFactor, width, height)
      return camera
    },
    addCurves () {
      const paths = []
      this.connections.forEach((record) => {
        const from = record.from
        const to = record.to
        // Convert to radian
        // inclination θ (latitude), azimuth φ (longitude)
        from.θ = lat2rad(from.lat)
        from.φ = lon2rad(from.lon)
        let cart = polar2cartesian(GLOBE_RADIUS, from.θ, from.φ)
        from.xyz = new THREE.Vector3(cart.x, cart.y, cart.z)

        to.θ = lat2rad(to.lat)
        to.φ = lon2rad(to.lon)
        cart = polar2cartesian(GLOBE_RADIUS, to.θ, to.φ)
        to.xyz = new THREE.Vector3(cart.x, cart.y, cart.z)

        let distance = from.xyz.distanceTo(to.xyz)
        // here we are creating the control points for the first ones.
        from.control = from.xyz.clone()
        to.control = to.xyz.clone()
        let mid = from.control.clone().add(to.control).multiplyScalar(0.5)
        // TODO replace by d3 scale?
        // not sure what this does
        function map (x, inMin, inMax, outMin, outMax) {
          return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
        }

        var smoothDist = map(distance, 0, 10, 0, 15 / distance)
        mid.setLength(GLOBE_RADIUS * smoothDist)
        from.control.add(mid)
        to.control.add(mid)
        from.control.setLength(GLOBE_RADIUS * smoothDist)
        to.control.setLength(GLOBE_RADIUS * smoothDist)

        // use this curve to calculate the points on the curve
        let curve = new THREE.CubicBezierCurve3(from.xyz, from.control, to.control, to.xyz)

        let geometry = new THREE.Geometry()
        geometry.vertices = curve.getPoints(50)

        // Use THREE.MeshLine if you need wider line
        let material = new THREE.LineBasicMaterial({
          color: 0xff0077,
          blending: THREE.AdditiveBlending,
          opacity: 0.8,
          transparent: true
        })

        // Create the final Object3d to add to the scene
        var curveObject = new THREE.Line(geometry, material)
        // TODO: how do you group all objects together
        paths.push(curve)
        this.scene.add(curveObject)
      })
    },
    /**
     * Render and animate the scene.
     * @return {[type]} [description]
     */
    animate () {
      requestAnimationFrame(this.animate)

      this.raycaster.setFromCamera(this.mouse, this.camera)
      this.intersections = this.raycaster.intersectObjects(this.avatar.mesh.children)
      this.avatar.mesh.children.forEach(function (d) { d.material.color = d.data.themeColor })

      if (this.intersections.length > 0) {
        this.intersections[0].object.material.color = WHITE
      }
      this.renderer.render(this.scene, this.camera)

    }
  }
}
