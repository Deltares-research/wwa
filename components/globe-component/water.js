import * as THREE from 'three'

import { GLOBE_RADIUS } from './constants'

class Water {
  constructor () {
    this.geometry = new THREE.SphereGeometry(GLOBE_RADIUS - 0.02, 64, 64)

    this.uniforms = {
      time: { value: 0 },
    }

    // https://shaderfrog.com/app/view/2113

    // this.material = new THREE.ShaderMaterial({
    //   uniforms: this.uniforms,
    //   vertexShader: require('./glsl/water.vert.glsl'),
    //   fragmentShader: require('./glsl/water.frag.glsl'),
    //   transparent: true
    // })

    this.material = new THREE.MeshPhongMaterial({
      color: 0x003355,
      transparent: true,
      opacity: 0.9,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }
}

export default Water
