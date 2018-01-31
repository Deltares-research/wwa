import * as THREE from 'three'

import { GLOBE_RADIUS } from './constants'

class Water {
  constructor () {
    this.geometry = new THREE.SphereGeometry(GLOBE_RADIUS - 0.02, 32, 32)
    this.material = new THREE.MeshPhongMaterial({
      color: 0x000033,
      opacity: 0.8,
      transparent: true
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }
}

export default Water
