import fs from 'fs'

const result = fs.readFileSync('./static/globe-themes/globe-data-arrays.json')
console.log(result);

let data;

// result.forEach((d, i) => {
//   const particle = {}
//
//   if (d[0] !== '') {
//     currentLat = lat2theta(+d[0])
//   }
//
//   particle.lat = currentLat
//   particle.lon = lon2phi(+d[1])
//
//   if (d[2] === '0') {
//     particle.hfo = 0
//     particle.dro = 0
//     particle.eco_s = 0
//   } else if (d[2] === '') {
//     particle.hfo = null
//     particle.dro = null
//     particle.eco_s = null
//   } else {
//     particle.hfo = (d[2].charCodeAt(0) - CHAR_OFFSET) / 10
//     particle.dro = (d[2].charCodeAt(1) - CHAR_OFFSET) / 10
//     particle.eco_s = (d[2].charCodeAt(2) - CHAR_OFFSET) / 10
//   }
//
//   data.push(particle)
// })
