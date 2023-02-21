import { stepsLogT } from '../types';

const insertion = (inputList: number[], stepsLog: stepsLogT) => {
  const output = [...inputList];

  for (let i = 1; i < output.length; i++) {
    let tmp = output[i];
    let j = i - 1;

    while (j >= 0) {
      stepsLog.push({
        type: 'compare',
        elements: [
          { type: 'index', value: j },
          { type: 'value', value: tmp },
        ],
      });

      if (tmp > output[j]) {
        break;
      }

      stepsLog.push({
        type: 'shift',
        elements: 
          { from: j, to: j + 1 },
      });
      output[j + 1] = output[j];
      j--;
    }

    if (tmp != output[i]) {
      stepsLog.push({
        type: 'replace',
        elements: [
          { type: 'index', value: j + 1 },
          { type: 'value', value: tmp },
        ],
      });
      output[j + 1] = tmp;
    }
  }

  return output;
};

export default insertion;
