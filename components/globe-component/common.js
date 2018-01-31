import { scaleLinear } from 'd3-scale'

export function polar2cartesian (radius, latitude, longitude) {
  const x = radius * Math.sin(latitude) * Math.cos(longitude)
  const y = radius * Math.sin(latitude) * Math.sin(longitude)
  const z = radius * Math.cos(latitude)

  return { x, y, z }
}

export function cartesian2polar (x, y, z) {
  const radius = Math.sqrt((x * x) + (y * y) + (z * z))
  const latitude = Math.acos(z / radius)
  const longitude = Math.atan2(y, x)

  return { radius, latitude, longitude }
}

export const deg2rad = deg => deg * (Math.PI / 180)

export const lat2rad = scaleLinear()
  .domain([-90, 90])
  .range([0, Math.PI])

export const lon2rad = scaleLinear()
  .domain([180, -180])
  .range([0, 2 * Math.PI])
