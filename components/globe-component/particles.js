import * as THREE from 'three'
// import { loadData } from 'd3-jetpack'
import { scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import { color } from 'd3-color'
import { lat2theta, lon2phi, polar2cartesian } from './common'
import { metrics } from './metrics'
import { GLOBE_RADIUS, MAX_PARTICLES } from './constants'
import request from 'request'
import { createStream } from 'csv-stream'

/** Scale to convert RGB 0-255 range to 0-1 range */
const rgb2unit = scaleLinear()
  .domain([0, 255])
  .range([0, 1])

  /** Scale for particle height offset */
const height = scaleLinear()
  .domain([0, 5])
  .range([0, 0])
  // .range([0, 0.03])
  // .range([0, 0.18])
  .clamp(true)

/** Scale for particle size */
const p = scaleLinear()
  .domain([780, 300])
  .range([10.0, 4.0])

  /** Scale for colors */
const c = scaleLinear()
  .domain(range(6))

class Particles {
  constructor (state) {
    this.state = state

    this.data = []

    this.uniforms = {
      time: { value: 0 },
      pointSize: { value: 10.0 }
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: require('./glsl/dot.vert.glsl'),
      fragmentShader: require('./glsl/dot.frag.glsl'),
      depthTest: true,
      vertexColors: true
    })

    this.geometry = new THREE.BufferGeometry()
    this.geometry.setDrawRange(0, 0) // range of the buffer array to draw. Will be increased when the stream loads particle data
    this.mesh = new THREE.Points(this.geometry, this.material)
  }

  update () {
    this.geometry.attributes.position.set(metrics[this.state.current].positions)
    this.geometry.attributes.targetPosition.set(metrics[this.state.target].positions)
    this.geometry.attributes.color.set(metrics[this.state.current].colors)
    this.geometry.attributes.targetColor.set(metrics[this.state.target].colors)
    this.geometry.attributes.value.set(metrics[this.state.target].values)
    this.geometry.attributes.ix.set(metrics[this.state.target].indices)

    this.geometry.attributes.value.needsUpdate = true
    this.geometry.attributes.ix.needsUpdate = true
    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.targetPosition.needsUpdate = true
    this.geometry.attributes.color.needsUpdate = true
    this.geometry.attributes.targetColor.needsUpdate = true

    this.uniforms.time.value = 0
  }

  handleResize (smallestHeight) {
    this.uniforms.pointSize.value = p(smallestHeight) < 1.0 ? 1.0 : p(smallestHeight) / (2 / window.devicePixelRatio)
  }

  activateTheme (theme) {
    if (!this.colors || !this.targetColors || !this.indices || !this.values || !this.mesh) {
      return false
    }
    this.state.current = this.state.target
    this.state.target = theme

    this.colors.set(metrics[this.state.current].colors)
    this.targetColors.set(metrics[this.state.target].colors)
    this.indices.set(metrics[this.state.target].indices)
    this.values.set(metrics[this.state.target].values)

    this.mesh.geometry.attributes.color.needsUpdate = true
    this.mesh.geometry.attributes.targetColor.needsUpdate = true
    this.mesh.geometry.attributes.ix.needsUpdate = true
    this.mesh.geometry.attributes.value.needsUpdate = true

    this.uniforms.time.value = 0.0
  }

  load (finished) {
    this.initGeometry()

    let i = 0
    console.time('load')
    const csvStream = createStream()
    request('http://localhost:9920/globe-themes/globe-data.csv')
      .pipe(csvStream)
      .on('error', err => console.error('Stream error', err))
      .on('data', d => {
        const particle = {}
        particle.lat = lat2theta(+d.lat)
        particle.lon = lon2phi(+d.lon)

        particle.hfo = +d.HFO_s || null
        particle.dro = +d.DRO_s || null
        particle.eco_s = +d.ECO_S_s || null

        this.geometry.attributes.position.set(metrics[this.state.current].positions)
        this.geometry.attributes.color.set(metrics[this.state.current].colors)

        this.geometry.attributes.position.needsUpdate = true
        this.geometry.attributes.color.needsUpdate = true
        this.geometry.setDrawRange(0, i + 1)

        this.data.push(particle)

        // window.setTimeout(10)

        // Object.keys(metrics).forEach((m) => {
        const m = this.state.current
        c.range(metrics[m].colorRange)

        const radius = GLOBE_RADIUS + height(particle[metrics[m].variable])
        const point = polar2cartesian(radius, particle.lat, particle.lon)
        const pos = new THREE.Vector3(point.x, point.y, point.z)

        metrics[m].positions[(i * 3) + 0] = pos.x
        metrics[m].positions[(i * 3) + 1] = pos.y
        metrics[m].positions[(i * 3) + 2] = pos.z

        const rgb = particle[metrics[m].variable] < 0 || particle.lat < lat2theta(-60) ? { r: 76, g: 76, b: 76 } : color(c(particle[metrics[m].variable]))
        metrics[m].colors[(i * 3) + 0] = rgb2unit(rgb.r)
        metrics[m].colors[(i * 3) + 1] = rgb2unit(rgb.g)
        metrics[m].colors[(i * 3) + 2] = rgb2unit(rgb.b)

        const colors = this.geometry.attributes.color.array
        colors[(i * 3) + 0] = rgb2unit(rgb.r)
        colors[(i * 3) + 1] = rgb2unit(rgb.g)
        colors[(i * 3) + 2] = rgb2unit(rgb.b)

        metrics[m].values[i] = particle[metrics[m].variable]
        metrics[m].indices[i] = i
        // })

        i++
      })
      .on('end', () => {
        if (finished) {
          finished()
        }
        console.timeEnd('load')
      })
      .on('error', e => console.error('failure loading globe data', e))
  }

  // createGeometry () {
  //   this.initGeometry()

  //   Object.keys(metrics).forEach((m) => {
  //     metrics[m].positions = new Float32Array(this.data.length * 3)
  //     metrics[m].colors = new Float32Array(this.data.length * 3)
  //     metrics[m].values = new Float32Array(this.data.length)
  //     metrics[m].indices = new Float32Array(this.data.length)

  //     c.range(metrics[m].colorRange)

  //     this.data.forEach((d, i) => {
  //       // TODO: this is temporary, until it has been decided what variables to use to illustrate the themes
  //       let variable = m
  //       if (m === 'too-little') {
  //         variable = 'dro'
  //       }
  //       if (m === 'too-much') {
  //         variable = 'hfo'
  //       }
  //       if (m === 'too-dirty') {
  //         variable = 'eco_s'
  //       }

  //       const radius = (GLOBE_RADIUS + height(d[variable]))
  //       const point = polar2cartesian(radius, d.lat, d.lon)
  //       const pos = new THREE.Vector3(point.x, point.y, point.z)

  //       metrics[m].positions[(i * 3) + 0] = pos.x
  //       metrics[m].positions[(i * 3) + 1] = pos.y
  //       metrics[m].positions[(i * 3) + 2] = pos.z

  //       const rgb = d[m] < 0 || d.lat < lat2theta(-60) ? { r: 76, g: 76, b: 76 } : color(c(d[variable]))
  //       metrics[m].colors[(i * 3) + 0] = rgb2unit(rgb.r)
  //       metrics[m].colors[(i * 3) + 1] = rgb2unit(rgb.g)
  //       metrics[m].colors[(i * 3) + 2] = rgb2unit(rgb.b)

  //       metrics[m].values[i] = d[variable]
  //       metrics[m].indices[i] = i
  //     })
  //   })
  // }

  initGeometry () {
    const positions = new Float32Array(MAX_PARTICLES * 3)
    this.geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))

    const targetPositions = new Float32Array(MAX_PARTICLES * 3)
    this.geometry.addAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3))

    this.colors = new Float32Array(MAX_PARTICLES * 3)
    this.geometry.addAttribute('color', new THREE.BufferAttribute(this.colors, 3))

    this.targetColors = new Float32Array(MAX_PARTICLES * 3)
    this.geometry.addAttribute('targetColor', new THREE.BufferAttribute(this.targetColors, 3))

    this.values = new Float32Array(MAX_PARTICLES)
    this.geometry.addAttribute('value', new THREE.BufferAttribute(this.values, 1))

    this.indices = new Float32Array(MAX_PARTICLES)
    this.geometry.addAttribute('ix', new THREE.BufferAttribute(this.indices, 1))

    Object.keys(metrics).forEach((m) => {
      metrics[m].positions = new Float32Array(MAX_PARTICLES * 3)
      metrics[m].colors = new Float32Array(MAX_PARTICLES * 3)
      metrics[m].values = new Float32Array(MAX_PARTICLES)
      metrics[m].indices = new Float32Array(MAX_PARTICLES)
    })
  }
}

export default Particles
