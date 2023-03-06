import { stepsLogT } from '../types';

const selection = (list: number[], stepsLog: stepsLogT) => {
  const output = [...list];

  for (let i = 0; i < output.length - 1; i++) {
    let minSelected = i;
    for (let j = i + 1; j < output.length; j++) {
      stepsLog.push({
        type: 'compare',
        elements: [
          { type: 'index', value: minSelected },
          { type: 'index', value: j },
        ],
      });
      if (output[minSelected] > output[j]) {
        minSelected = j;
      }
    }

    // xoring same value with itself produces 0.
    stepsLog.push({
      type: 'swap',
      elements: [
        { type: 'index', value: minSelected },
        { type: 'index', value: i },
      ],
    });
    if (minSelected != i) {
      output[i] ^= output[minSelected];
      output[minSelected] ^= output[i];
      output[i] ^= output[minSelected];
    }
  }

  return output;
};

export default selection;
