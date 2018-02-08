import { scaleLinear } from 'd3-scale'

// We use the phi, theta notation, as used in
// https://en.wikipedia.org/wiki/Spherical_coordinate_system

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

/**
 * Convert from latitude to theta (latitude in radians)
 * @param {Number} lat - latitude in range (-90, 90)
 * @returns {Number} theta - latitude in range(0, π)
 */
export const lat2theta = scaleLinear()
  .domain([-90, 90])
  .range([0, Math.PI])

// TODO: check why lon is inverted.
/**
 * Convert from longitude in degrees to phi (longitude in radians)
 * @param {Number} lon - longitude in range (-360, 360)
 * @returns {Number} phi - longitude in range(-2π, 2π)
 */
export const lon2phi = scaleLinear()
  .domain([360, -360])
  .range([-2 * Math.PI, 2 * Math.PI])

/**
 * Convert from theta (latitude in radians) to latitude in degrees
 * @param {Number} theta - longitude in range(0, π)
 * @returns {Number} latitude - latitude in range(-90, 90)
 */
export const theta2lat = scaleLinear()
  .domain([0, Math.PI])
  .range([-90, 90])

// TODO: check why lon is inverted.
/**
 * Convert from phi (longitude in radians) to longitude in degrees
 * @param {Number} phi - longitude in range(-2π, 2π)
 * @returns {Number} lon - longitude in range (-360, 360)
 */
export const phi2lon = scaleLinear()
  .domain([-2 * Math.PI, 2 * Math.PI])
  .range([360, -360])
