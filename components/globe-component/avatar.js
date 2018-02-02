import * as THREE from 'three'

import { GLOBE_RADIUS, INIT_ANGLE, INIT_AXIS } from './constants'
import { lon2rad, lat2rad } from './common'

const SCALE = 1.1

const TOO_MUCH = 0x41b6c4
const TOO_LITTLE = 0xfd8d3c
const TOO_DIRTY = 0xa63603
const THEME_COLORS = {
  'too much': TOO_MUCH,
  'too little': TOO_LITTLE,
  'too dirty': TOO_DIRTY
}

class Avatar {
  constructor (markers, base) {
    this.markers = markers
    this.textures = {}
    this.textures['too dirty'] = new THREE.TextureLoader().load(base + '/avatars/too-dirty.png')
    this.textures['too much'] = new THREE.TextureLoader().load(base + '/avatars/too-much.png')
    this.textures['too little'] = new THREE.TextureLoader().load(base + '/avatars/too-little.png')
    this.mesh = new THREE.Object3D()
  }

  /**
   * load avatar data and create avatar objects
   * @param  {function} finished callback function, called when done
   * @return {[type]}          [description]
   */
  load (finished) {
    this.markers.forEach((d, i) => {
      const themeColor = THEME_COLORS[d.book.theme]
      const texture = this.textures[d.book.theme]
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: new THREE.Color(themeColor)
      })

      const avatar = new THREE.Sprite(material)
      // const avatar = new THREE.Sprite(material.clone())

      // latitude and longitude are mixed up in the data
      const lon = lon2rad(d.location.lat)
      const lat = lat2rad(d.location.lng)

      const x = SCALE * GLOBE_RADIUS * Math.sin(lat) * Math.cos(lon)
      const y = SCALE * GLOBE_RADIUS * Math.sin(lat) * Math.sin(lon)
      const z = SCALE * GLOBE_RADIUS * Math.cos(lat)

      const position = new THREE.Vector3(x, y, z)
      position.applyAxisAngle(INIT_AXIS, INIT_ANGLE)

      avatar.position.x = position.x
      avatar.position.y = position.y
      avatar.position.z = position.z

      avatar.data = d
      avatar.data.themeColor = new THREE.Color(themeColor)

      this.mesh.add(avatar)
    })

    finished(this.mesh)
  }
}

export default Avatar
