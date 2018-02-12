import * as THREE from 'three'

import { GLOBE_RADIUS } from './constants'

const vertexShader = require('./glsl/glow.vert.glsl')
const fragmentShader = require('./glsl/glow.frag.glsl')

class Glow {
  constructor (camera) {
    this.uniforms = {
      viewVector: { type: 'v3', value: camera.position }
    }

    this.geometry = new THREE.SphereGeometry(GLOBE_RADIUS - 0.02, 64, 64)
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.5
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.multiplyScalar(1.35)
  }
}

export default Glow
