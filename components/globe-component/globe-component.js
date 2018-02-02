import * as THREE from 'three'
import { Tween, autoPlay, Easing } from 'es6-tween'
import { cartesian2polar, polar2cartesian, deg2rad } from './geometry.js'
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
    activeStory: {
      type: String,
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
          const to = {lat: 12, lon: 0}
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
    // this.addMarkers()
    this.addCurves()
    this.pan()
    this.zoom()
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
      if (this.intersections.length > 0) {
        const from = cartesian2polar(this.camera.position.x, this.camera.position.y, this.camera.position.z)

        const targetPos = {
          x: this.intersections[0].object.position.x,
          y: this.intersections[0].object.position.y,
          z: this.intersections[0].object.position.z
        }

        const to = cartesian2polar(targetPos.x, targetPos.y, targetPos.z)
        // to.radius = this.intersections[0].object.data.location.zoom === null ? from.radius : this.intersections[0].object.data.location.zoom
        // to.radius = from.radius
        to.radius = 7 + Math.random() * 13

        const tween = new Tween(from)
          .to(to, 3000)
          .on('update', ({ radius, latitude, longitude }) => {
            const cart = polar2cartesian(radius, latitude, longitude)
            this.camera.position.set(cart.x, cart.y, cart.z)

            this.camera.lookAt(new THREE.Vector3(0, 0, 0))
          })
          .easing(Easing.Cubic.InOut)
          .start()
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
    pan () {
      console.log('panning to', this.activeStory)
    },
    /**
     * Zoom to the zoom level of the active story
     */
    zoom () {
      console.log('zooming to', this.activeStory)
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

      this.avatar = new Avatar()
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
      camera.position.z = 30 * (1 + vOffsetFactor) * (1 + vOffsetFactor)
      camera.setViewOffset(renderWidth, renderHeight, 0, height * vOffsetFactor, width, height)
      return camera
    },
    addCurves () {
      const paths = []
      this.connections.forEach((record) => {
        const from = record.from
        const to = record.to
        // Convert to radian
        from.φ = deg2rad(from.lat)
        from.θ = deg2rad(from.lon)
        from.xyz = polar2cartesian(GLOBE_RADIUS, from.φ, from.θ)

        to.φ = deg2rad(to.lat)
        to.θ = deg2rad(to.lon)
        to.xyz = polar2cartesian(GLOBE_RADIUS, to.φ, to.θ)

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
    addMarkers () {
      // add the markers to the scene
      const loader = new THREE.TextureLoader()
      // loop over all markers and add them after the texture is loaded
      this.markers.forEach(
        (marker) => {
          const lat = deg2rad(marker.location.lat)
          const lon = deg2rad(marker.location.lon)
          const position = polar2cartesian(GLOBE_RADIUS * 1.3, lat, lon)
          if (marker.characterPortrait == null) {
            return
          }
          // we get these from a remote url, this means that the canvas
          // will be marked as tainted:
          // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
          const url = assetsRoot + marker.characterPortrait.path
          // load and wait for it to add the avatar and re-render
          loader.load(
            url,
            (texture) => {
              // allow non power of 2 textures
              texture.minFilter = THREE.LinearFilter
              const avatarMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: 0xffffff
              })
              const avatar = new THREE.Sprite(avatarMaterial)
              // store the avatar so we can zoom to it
              marker.avatar = avatar
              avatar.position.x = position.x
              avatar.position.y = position.y
              avatar.position.z = position.z
              this.scene.add(avatar)
              this.render()
            }
          )
        }
      )
    },
    /**
     * Render and animate the scene.
     * @return {[type]} [description]
     */
    animate () {
      requestAnimationFrame(this.animate)

      // particles.uniforms.time.value += 0.1;
      // this.glow.uniforms.viewVector.value = new THREE.Vector3().subVectors(camera.position, globe.position);

      // globe.rotation.y += 0.0005;

      // this.stats.begin()

      this.raycaster.setFromCamera(this.mouse, this.camera)
      this.intersections = this.raycaster.intersectObjects(this.avatar.mesh.children)
      this.avatar.mesh.children.forEach(function (d) { d.material.color = d.data.themeColor })

      if (this.intersections.length > 0) {
        this.intersections[0].object.material.color = WHITE

      //   globeEl
      //     .st({ cursor: 'pointer' });
      // } else {
      //   globeEl
      //     .st({ cursor: 'default' });
      }

      this.renderer.render(this.scene, this.camera)

      // this.stats.end()
    }
  }
}
