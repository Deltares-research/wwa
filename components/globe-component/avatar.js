import * as THREE from 'three'
import { loadData } from 'd3-jetpack'

import { GLOBE_RADIUS, INIT_ANGLE, INIT_AXIS } from './constants'
import { lon2rad, lat2rad } from './common'

const SCALE = 1.1

const TOO_MUCH = 0xff0077
const TOO_LITTLE = 0x00ff77
const TOO_DIRTY = 0x0077ff

class Avatar {
  constructor () {
    this.texture = new THREE.TextureLoader().load('sample_avatar_rounded.png')
    this.mesh = new THREE.Object3D()
  }

  /**
   * load avatar data and create avatar objects
   * @param  {function} finished callback function, called when done
   * @return {[type]}          [description]
   */
  load (finished) {
    loadData('data/globeMarkers.json', (err, result) => {
      if (err) {
        console.error('marker data could not be loaded', err)
      }

      // const material = new THREE.SpriteMaterial({
      //   map: this.texture,
      //   color: 0xffffff
      // })

      const that = this

      result[0].forEach((d, i) => {
        let themeColor = 0x000000

        if (i % 3 === 0) {
          themeColor = TOO_MUCH
        } else if (i % 3 === 1) {
          themeColor = TOO_LITTLE
        } else if (i % 3 === 2) {
          themeColor = TOO_DIRTY
        }

        const material = new THREE.SpriteMaterial({
          map: this.texture,
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

        that.mesh.add(avatar)
      })

      finished(this.mesh)
    })
  }
}

export default Avatar
