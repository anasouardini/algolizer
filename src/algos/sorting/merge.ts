import { stepsLogT } from '../types';

const merge = (list: number[], stepsLog: stepsLogT) => {
  const output = [...list];

  const mergeSrt = (
    outputArg: number[],
    stepsLog: stepsLogT,
    indexMap: number[]
  ) => {
    if (outputArg && outputArg.length < 2) {
      return outputArg;
    }

    // split
    stepsLog.push({
      type: 'split',
      chunks: [
        { start: indexMap[0], end: indexMap[outputArg.length / 2 - 1] },
        {
          start: indexMap[outputArg.length / 2],
          end: indexMap[outputArg.length - 1],
        },
      ],
    });
    let leftArr = outputArg.slice(0, outputArg.length / 2);
    let rightArr = outputArg.slice(outputArg.length / 2);
    const leftArrIndexMap = indexMap.slice(0, indexMap.length / 2);
    const rightArrIndexMap = indexMap.slice(indexMap.length / 2);
    leftArr = mergeSrt(leftArr as [], stepsLog, leftArrIndexMap);
    rightArr = mergeSrt(rightArr as [], stepsLog, rightArrIndexMap);

    // sort
    let sorted = [];
    let l = 0;
    let r = 0;
    while (l < leftArr.length && r < rightArr.length) {
      stepsLog.push({
        type: 'compare',
        elements: [
          { type: 'index', value: leftArrIndexMap[l] },
          { type: 'value', value: rightArrIndexMap[r] },
        ],
      });
      if (leftArr[l] < rightArr[r]) {
        // order matters
        stepsLog.push({
          type: 'push',
          element: { index: leftArrIndexMap[l], value: leftArr[l] },
          target: { index: indexMap[sorted.length] },
        });
        sorted.push(leftArr[l]);
        l++;
        continue;
      }

      stepsLog.push({
        type: 'push',
        element: { index: rightArrIndexMap[r], value: rightArr[r] },
        target: { index: indexMap[sorted.length] },
      });
      sorted.push(rightArr[r]);
      r++;
    }

    const step: { target: number[]; source: number } = {
      target: [],
      // order matters
      // apending after the last element, so start should be the length
      source: indexMap[sorted.length],
    };

    if (l < leftArr.length) {
      step.target = [...leftArr.slice(l)];
      sorted = [...sorted, ...leftArr.slice(l)];
    } else {
      step.target = [...rightArr.slice(r)];
      sorted = [...sorted, ...rightArr.slice(r)];
    }
    stepsLog.push({
      type: 'append',
      source: step.source,
      target: step.target,
    });

    stepsLog.push({
      type: 'highlight',
      chunk: { start: indexMap[0], end: indexMap[sorted.length - 1] },
    });
    return sorted;
  };

  const initialIndexMap = Array(list.length)
    .fill(0)
    .map((item, index) => index);
  return mergeSrt(output, stepsLog, initialIndexMap);
};

export default merge;
