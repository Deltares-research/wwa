import { SphereGeometry, ShaderMaterial, BackSide, AdditiveBlending, Mesh } from 'three'

import { GLOBE_RADIUS } from './constants'

const vertexShader = require('./glsl/glow.vert.glsl')
const fragmentShader = require('./glsl/glow.frag.glsl')

class Glow {
  constructor (camera) {
    this.uniforms = {
      viewVector: { type: 'v3', value: camera.position }
    }

    this.geometry = new SphereGeometry(GLOBE_RADIUS - 0.02, 64, 64)
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      side: BackSide,
      blending: AdditiveBlending,
      transparent: true,
      opacity: 0.5,
      depthTest: true,
      depthWrite: false
    })

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.scale.multiplyScalar(1.25)
  }
}

export default Glow
