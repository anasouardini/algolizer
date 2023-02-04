import selection from './sorting/selection';
import insertion from './sorting/insertion';
import bubble from './sorting/bubble';
import quick from './sorting/quick';
import merge from './sorting/merge';

// TODO: visualize memory consumption

// TESTING
const algoTester = ()=>{
  const input = [3, 55, 5, 0, 12, 2, 4, 23, 1];
  const output = merge(input);
  console.log('input: ', input);
  console.log('output: ', output);
}

export default algoTester;
// export default { sorting: {selection }};
