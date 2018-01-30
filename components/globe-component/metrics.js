import {
  schemeYlGnBu,
  schemeYlOrRd,
  schemeRdPu,
  schemeOranges
} from 'd3-scale-chromatic'

export const metrics = {
  init: {
    colorRange: ['steelblue'],
    label: 'initial'
  },
  hfo: {
    colorRange: schemeYlGnBu[5],
    label: 'Flood Occurrence'
  },
  dro: {
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
  eco_s: {
    colorRange: schemeRdPu[5],
    label: 'Upstream Protected Land'
  }
}
