import {
  schemeYlGnBu,
  schemeYlOrRd,
  schemeRdPu,
} from 'd3-scale-chromatic';
import { range } from 'd3-array';
import { scaleLinear } from 'd3-scale';

export const metrics = {
  'too-much': {
    label: 'Flood Occurrence',
    variable: 'hfo',
    positionIndex: 1, // position in the data set array
    c: scaleLinear().domain(range(6)).range(schemeYlGnBu[5]),
  },
  'too-little': {
    label: 'Drought Severity',
    variable: 'dro',
    positionIndex: 2, // position in the data set array
    c: scaleLinear().domain(range(6)).range(schemeYlOrRd[5]),
  },
  'too-dirty': {
    label: 'Upstream Protected Land',
    variable: 'eco_s',
    positionIndex: 3, // position in the data set array
    c: scaleLinear().domain(range(6)).range(schemeRdPu[5]),
  },
};
