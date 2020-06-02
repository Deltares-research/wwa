import { ShaderMaterial, BufferGeometry, Points, BufferAttribute, Vector3 } from 'three'
import { scaleLinear } from 'd3-scale'
import { color } from 'd3-color'
import { lat2theta, lon2phi, polar2cartesian } from './common'
import { metrics } from './metrics'
import { GLOBE_RADIUS, MAX_PARTICLES } from './constants'
import result from '../../static/globe-themes/globe-data-arrays.json'

/** Scale to convert RGB 0-255 range to 0-1 range */
const rgb2unit = scaleLinear()
  .domain([0, 255])
  .range([0, 1])

/** Scale for particle size */
const p = scaleLinear()
  .domain([780, 300])
  .range([10.0, 4.0])

class Particles {
  constructor (base, state) {
    this.base = base
    this.state = state

    this.data = []

    this.uniforms = {
      time: { value: 0 },
      pointSize: { value: 10.0 }
    }

    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: require('./glsl/dot.vert.glsl'),
      fragmentShader: require('./glsl/dot.frag.glsl'),
      depthTest: true,
      vertexColors: true
    })

    this.geometry = new BufferGeometry()
    this.mesh = new Points(this.geometry, this.material)
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

  replaceTheme (slug) {
    if (!this.colors || !this.targetColors || !this.indices || !this.values || !this.mesh) {
      return false
    }
    this.state.current = this.state.target
    this.state.target = slug

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
      let currentLat = null
      const CHAR_OFFSET = 48

      const keys = Object.keys(metrics)

      result.forEach((d, i) => {
        const particle = {}

        if (d[0] !== '') {
          currentLat = lat2theta(+d[0])
        }

        particle.lat = currentLat
        particle.lon = lon2phi(+d[1])

        if (d[2] === '0') {
          particle.hfo = 0
          particle.dro = 0
          particle.eco_s = 0
        } else if (d[2] === '') {
          particle.hfo = null
          particle.dro = null
          particle.eco_s = null
        } else {
          particle.hfo = (d[2].charCodeAt(0) - CHAR_OFFSET) / 10
          particle.dro = (d[2].charCodeAt(1) - CHAR_OFFSET) / 10
          particle.eco_s = (d[2].charCodeAt(2) - CHAR_OFFSET) / 10
        }

        this.data.push(particle)

        keys.forEach((m) => {
          const metric = metrics[m]

          const radius = GLOBE_RADIUS
          const point = polar2cartesian(radius, particle.lat, particle.lon)
          const pos = new Vector3(point.x, point.y, point.z)

          metric.positions[(i * 3) + 0] = pos.x
          metric.positions[(i * 3) + 1] = pos.y
          metric.positions[(i * 3) + 2] = pos.z

          const rgb = particle[metric.variable] < 0 || particle.lat < lat2theta(-60) ? { r: 76, g: 76, b: 76 } : color(metric.c(particle[metric.variable]))
          metric.colors[(i * 3) + 0] = rgb2unit(rgb.r)
          metric.colors[(i * 3) + 1] = rgb2unit(rgb.g)
          metric.colors[(i * 3) + 2] = rgb2unit(rgb.b)

          const colors = this.geometry.attributes.color.array
          colors[(i * 3) + 0] = rgb2unit(rgb.r)
          colors[(i * 3) + 1] = rgb2unit(rgb.g)
          colors[(i * 3) + 2] = rgb2unit(rgb.b)

          metric.values[i] = particle[metric.variable]
          metric.indices[i] = i
        })
      })

      this.geometry.attributes.position.set(metrics[this.state.current].positions)
      this.geometry.attributes.color.set(metrics[this.state.current].colors)

      this.geometry.attributes.position.needsUpdate = true
      this.geometry.attributes.color.needsUpdate = true

      if (finished) {
        console.log(this.data);
        finished()
      }
  }

  initGeometry () {
    const positions = new Float32Array(MAX_PARTICLES * 3)
    this.geometry.setAttribute('position', new BufferAttribute(positions, 3))

    const targetPositions = new Float32Array(MAX_PARTICLES * 3)
    this.geometry.setAttribute('targetPosition', new BufferAttribute(targetPositions, 3))

    this.colors = new Float32Array(MAX_PARTICLES * 3)
    this.geometry.setAttribute('color', new BufferAttribute(this.colors, 3))

    this.targetColors = new Float32Array(MAX_PARTICLES * 3)
    this.geometry.setAttribute('targetColor', new BufferAttribute(this.targetColors, 3))

    this.values = new Float32Array(MAX_PARTICLES)
    this.geometry.setAttribute('value', new BufferAttribute(this.values, 1))

    this.indices = new Float32Array(MAX_PARTICLES)
    this.geometry.setAttribute('ix', new BufferAttribute(this.indices, 1))

    Object.keys(metrics).forEach((m) => {
      metrics[m].positions = new Float32Array(MAX_PARTICLES * 3)
      metrics[m].colors = new Float32Array(MAX_PARTICLES * 3)
      metrics[m].values = new Float32Array(MAX_PARTICLES)
      metrics[m].indices = new Float32Array(MAX_PARTICLES)
    })
  }
}

export default Particles
