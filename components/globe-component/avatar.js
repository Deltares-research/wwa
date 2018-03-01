import * as THREE from 'three'

import get from 'lodash.get'

import { GLOBE_RADIUS } from './constants'
import { polar2cartesian, lat2theta, lon2phi } from './common'

const SCALE = 1.1

class Avatar {
  constructor (base) {
    this.textures = {}
    this.textures['too-dirty'] = new THREE.TextureLoader().load(base + 'assets/too-dirty.svg')
    this.textures['too-much'] = new THREE.TextureLoader().load(base + 'assets/too-much.svg')
    this.textures['too-little'] = new THREE.TextureLoader().load(base + 'assets/too-little.svg')
    this.textures['mask'] = new THREE.TextureLoader().load(base + 'assets/too-little.svg')
    this.mesh = new THREE.Object3D()
  }

  /**
   * load avatar data and create avatar objects
   * @param  {function} finished callback function, called when done
   * @return {[type]}          [description]
   */
  load (markers, finished) {
    this.markers = markers

    const materialOptions = {
      color: 0xffffff,
      sizeAttenuation: false,
      size: 50.0,
      transparent: true,
      depthWrite: false
    }

    this.markers.forEach(marker => {
      if (!marker.location) {
        return false
      }
      const themeSlug = get(marker, 'theme.slug', undefined)
      // const avatarImgPath = get(marker, 'storyteller.avatar.value.path', null)
      // const avatarImgHost = get(marker, 'storyteller.avatar.imgixHost')

      let map = (themeSlug) ? this.textures[themeSlug] : null

      // // if an avatar is defined, use it
      // if (avatarImgPath) {
      //   // Add texture only if it is not already defined
      //   if (!this.textures[avatarImgPath]) {
      //     const textureLoader = new THREE.TextureLoader()
      //     textureLoader.setCrossOrigin('')
      //     this.textures[avatarImgPath] = textureLoader.load(`${avatarImgHost}${avatarImgPath}`)
      //   }
      //   map = this.textures[avatarImgPath]
      // // otherwise fall back to theme icon with a light border
      // } else {
      //   map = (themeSlug) ? this.textures[themeSlug] : null
      // }

      const lon = lon2phi(marker.location.lon)
      const lat = lat2theta(marker.location.lat)

      const {x, y, z} = polar2cartesian(SCALE * GLOBE_RADIUS, lat, lon)
      const position = new THREE.Vector3(x, y, z)

      const geometry = new THREE.Geometry()
      const material = new THREE.PointsMaterial({ ...materialOptions, map })
      const avatar = new THREE.Points(geometry, material)

      const vector = new THREE.Vector3()
      vector.x = position.x
      vector.y = position.y
      vector.z = position.z

      geometry.vertices.push(vector)

      avatar.data = marker
      this.mesh.add(avatar)
    })

    finished(this.mesh)
  }

  clear () {
    this.mesh.remove(...this.mesh.children)
    this.markers = []
  }
}

export default Avatar
