import {
  schemeYlGnBu,
  schemeYlOrRd,
  schemeRdPu
} from 'd3-scale-chromatic'

export const metrics = {
  'too-much': {
    colorRange: schemeYlGnBu[5],
    label: 'Flood Occurrence',
    variable: 'hfo',
    positionIndex: 1 // position in the data set array
  },
  'too-little': {
    colorRange: schemeYlOrRd[5],
    label: 'Drought Severity',
    variable: 'dro',
    positionIndex: 2 // position in the data set array
  },
  'too-dirty': {
    colorRange: schemeRdPu[5],
    label: 'Upstream Protected Land',
    variable: 'eco_s',
    positionIndex: 3 // position in the data set array
  }
}
