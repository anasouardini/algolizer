import selection from './sorting/selection';


// TESTING
const algoTester = ()=>{
  const input = [3, 55, 5, 0, 12, 2, 4, 23, 1];
  const output = selection(input);
  console.log('input: ', input);
  console.log('output: ', output);
}

export default algoTester;
// export default { sorting: {selection }};
