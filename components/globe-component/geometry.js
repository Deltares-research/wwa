import { scaleLinear } from 'd3-scale'
import { Vector3 } from 'three'

/**
 * Convert from polar to cartesian coordinates
 * @param {Number} radius - sphere radius
 * @param {Number} latitude - in radians
 * @param {Number} longitude - in radians
 * @returns {THREE.Vector3} polar coordinate {x, y, z}
 */
export function polar2cartesian (radius, latitude, longitude) {
  const x = radius * Math.sin(latitude) * Math.cos(longitude)
  const y = radius * Math.sin(latitude) * Math.sin(longitude)
  const z = radius * Math.cos(latitude)

  return new Vector3(x, y, z)
}

/**
 * Convert from cartesian to polar coordinates
 * @param {Number} x - x coordinate
 * @param {Number} y - y coordinate
 * @param {Number} z - z coordinate
 * @returns {Object} Object with radius, latitude, longitude
 */
export function cartesian2polar (x, y, z) {
  const radius = Math.sqrt((x * x) + (y * y) + (z * z))
  const latitude = Math.acos(z / radius)
  const longitude = Math.atan2(y, x)

  return { radius, latitude, longitude }
}

// degrees to radians (not clipping)
export const deg2rad = deg => deg * (Math.PI / 180)

// these two functions clip
export const lat2rad = scaleLinear()
  .domain([-90, 90])
  .range([0, Math.PI])

export const lon2rad = scaleLinear()
  .domain([180, -180])
  .range([0, 2 * Math.PI])
