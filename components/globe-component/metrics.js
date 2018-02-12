import {
  schemeYlGnBu,
  schemeYlOrRd,
  schemeYlGn,
  schemeRdPu,
  schemeOranges
} from 'd3-scale-chromatic'

export const metrics = {
  init: {
    colorRange: ['steelblue'],
    label: 'initial'
  },
  'too-much': {
    colorRange: schemeYlGnBu[5],
    label: 'Flood Occurrence'
  },
  'too-little': {
    colorRange: schemeYlOrRd[5],
    label: 'Drought Severity'
  },
  wri: {
    colorRange: schemeRdPu[5],
    label: 'Return Flow Ratio'
  },
  wsv: {
    colorRange: schemeOranges[5],
    label: 'Inter-annual Variability'
  },
  sv: {
    colorRange: schemeOranges[5],
    label: 'Seasonal Variability'
  },
  'too-dirty': {
    colorRange: schemeYlGn[5],
    label: 'Upstream Protected Land'
  }
}
