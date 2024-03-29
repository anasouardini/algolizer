import { stepsLogT } from '../types';

const bubble = (list: number[], stepsLog: stepsLogT) => {
  const output = [...list];

  // let i=1 in the outer array is like j<output.length-i-1 in the outer one
  for (let i = 1; i < output.length; i++) {
    let swapped = false;
    for (let j = 0; j < output.length - i; j++) {
      stepsLog.push({
        type: 'compare',
        elements: [
          { type: 'index', value: j },
          { type: 'index', value: j + 1 },
        ],
      });
      if (output[j] > output[j + 1]) {
        stepsLog.push({
          type: 'swap',
          elements: [
            { type: 'index', value: j },
            { type: 'index', value: j + 1 },
          ],
        });
        [output[j], output[j + 1]] = [output[j + 1], output[j]]
        // output[j] ^= output[j + 1];
        // output[j + 1] ^= output[j];
        // output[j] ^= output[j + 1];

        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }

  return output;
};

export default bubble;
