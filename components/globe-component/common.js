import { scaleLinear } from 'd3-scale'

/**
 * Convert from polar to cartesian coordinates
 * @param {Number} radius - sphere radius
 * @param {Number} latitude - in radians
 * @param {Number} longitude - in radians
 * @returns {THREE.Vector3} polar coordinate {x, y, z}
 */
export function polar2cartesian (radius, latitude, longitude) {
  // inclination theta (latitude), azimuth phi (longitude)
  const x = radius * Math.sin(latitude) * Math.cos(longitude)
  const y = radius * Math.sin(latitude) * Math.sin(longitude)
  const z = radius * Math.cos(latitude)

  return { x, y, z }
}

/**
 * Convert from cartesian to polar coordinates
 * @param {Number} x - x coordinate
 * @param {Number} y - y coordinate
 * @param {Number} z - z coordinate
 * @returns {Object} Object with r (radius), theta (latitude in radians), azimuth phi (longitude in radians)
 */
export function cartesian2polar (x, y, z) {
  // radius r, inclination theta (latitude), azimuth phi (longitude)
  const r = Math.sqrt((x * x) + (y * y) + (z * z))
  const theta = Math.acos(z / r)
  const phi = Math.atan2(y, x)
  return { r, theta, phi }
}

export const deg2rad = deg => deg * (Math.PI / 180)

export const lat2rad = scaleLinear()
  .domain([-90, 90])
  .range([0, Math.PI])

export const lon2rad = scaleLinear()
  .domain([180, -180])
  .range([0, 2 * Math.PI])

export const theta2deg = scaleLinear()
  .domain([0, Math.PI])
  .range([-90, 90])

export const phi2deg = scaleLinear()
  .domain([0, 2 * Math.PI])
  .range([180, -180])
