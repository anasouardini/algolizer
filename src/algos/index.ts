import selection from './sorting/selection';
import insertion from './sorting/insertion';
import bubble from './sorting/bubble';
import quick from './sorting/quick';
import merge from './sorting/merge';
import linear from './searching/linear';
import binaryOrdered from './searching/binaryOrdered';
import quickSelect from './searching/quickSelect';
import interpolation from './searching/interpolation';

// TODO: visualize memory consumption

// TESTING
const algoTester = () => {
  const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // const input = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
  // const input = [0, 2, 5, 12, 22, 40, 55, 56];
  // const input = [3, 55, 5, 0, 12, 2, 4, 23, 1];
  // const output = interpolation(input, 8);
  console.log('input: ', input);
  console.log('output: ', output);
};

// export default algoTester;
export default {
  sorting: [ selection, insertion, bubble, quick, merge ],
  searching: [ linear ],
};
