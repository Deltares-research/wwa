import * as THREE from 'three'

import get from 'lodash.get'
import dbscan from 'dbscanjs'
import { greatCircleDistance } from './common.js'
import { nest } from 'd3-collection'
import { mean } from 'd3-array'

class Avatar {
  constructor (base) {
    this.textures = {}
    this.textures['too-dirty'] = new THREE.TextureLoader().load(base + 'assets/too-dirty.png')
    this.textures['too-much'] = new THREE.TextureLoader().load(base + 'assets/too-much.png')
    this.textures['too-little'] = new THREE.TextureLoader().load(base + 'assets/too-little.png')
    this.mesh = new THREE.Object3D()
  }

  offsetOverlappingMarkers () {
    const OFFSET_DISTANCE = 3
    const DISTANCE_THRESHOLD = 50

    this.markers.forEach(marker => {
      marker.offsetLocation = {
        lon: marker.location.lon,
        lat: marker.location.lat,
        zoom: marker.location.zoom,
      }
    })

    const MAX_ITER = 50
    let iter = 0
    let overlapCount = Infinity

    while (iter < MAX_ITER && overlapCount > 0) {
      iter++
      let currentOverlapCount = 0

      for (let i = 0; i < this.markers.length; i++) {
        for (let j = 0; j < i; j++) {
          const p0 = [this.markers[i].offsetLocation.lon, this.markers[i].offsetLocation.lat]
          const p1 = [this.markers[j].offsetLocation.lon, this.markers[j].offsetLocation.lat]

          const dist = greatCircleDistance(p0, p1)

          if (dist < DISTANCE_THRESHOLD) {
            currentOverlapCount++

            const angle = Math.atan2(p0[1] - p1[1], p0[0] - p1[0])

            const dp0 = [p0[0] + Math.cos(angle) * OFFSET_DISTANCE, p0[1] + Math.sin(angle) * OFFSET_DISTANCE]
            const dp1 = [p1[0] - Math.cos(angle) * OFFSET_DISTANCE, p1[1] - Math.sin(angle) * OFFSET_DISTANCE]

            this.markers[i].offsetLocation.lon = dp0[0]
            this.markers[i].offsetLocation.lat = dp0[1]

            this.markers[j].offsetLocation.lon = dp1[0]
            this.markers[j].offsetLocation.lat = dp1[1]
          }
        }
      }
      overlapCount = currentOverlapCount
    }
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
      depthWrite: false,
    }

    this.offsetOverlappingMarkers()

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

      const geometry = new THREE.Geometry()
      const material = new THREE.PointsMaterial({ ...materialOptions, map })
      const avatar = new THREE.Points(geometry, material)

      geometry.vertices.push(new THREE.Vector3())

      avatar.data = marker
      avatar.data.originalTexture = map

      this.mesh.add(avatar)
    })

    const epsilon = 500 // The maximum distance between two points for them to be considered as being in the same neighborhood.
    const minPoints = 2 // The minimum number of points in any group for them to be considered a distinct group. All other points are considered to be noise, and will receive a label of -1.

    // const labels = dbscan(this.mesh.children.map(d => [d.data.location.lon, d.data.location.lat]), greatCircleDistance, epsilon, minPoints)
    const labels = dbscan(this.mesh.children.map(d => [d.data.offsetLocation.lon, d.data.offsetLocation.lat]), greatCircleDistance, epsilon, minPoints)
    this.mesh.children.forEach((d, i) => {
      d.data.cluster = labels[i]
    })

    const nested = nest()
      .key(d => d.data.cluster)
      .entries(this.mesh.children)

    nested.forEach(d => {
      if (+d.key === -1) {
        d.values.forEach(function (d) {
          // d.data.meanLocation = [d.data.location.lon, d.data.location.lat]
          d.data.meanLocation = [d.data.offsetLocation.lon, d.data.offsetLocation.lat]
        })
      } else {
        // const meanLocation = [mean(d.values.map(d => d.data.location.lon)), mean(d.values.map(d => d.data.location.lat))]
        const meanLocation = [mean(d.values.map(d => d.data.offsetLocation.lon)), mean(d.values.map(d => d.data.offsetLocation.lat))]
        d.values.forEach(function (d) {
          d.data.meanLocation = meanLocation
        })
      }
    })

    finished(this.mesh)
  }

  clear () {
    this.mesh.remove(...this.mesh.children)
    this.markers = []
  }
}

export default Avatar
