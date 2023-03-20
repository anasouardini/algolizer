import { stepsLogT } from '../types';

// TODO: refactor this miss
const binaryOrdered = (list: number[], target: number, stepsLog: stepsLogT) => {
  let tmpList = [...list];
  let start = 0;
  let end = 0;
  while (start <= end) {
    const middleIndex = Math.floor(start + (end - start) / 2);

    stepsLog.push({
      type: 'compare',
      elements: [
        { type: 'value', value: target },
        { type: 'index', value: middleIndex },
      ],
    });
    if (target == tmpList[middleIndex]) {
      // console.log(target, middleIndex)
      stepsLog.push({
        type: 'found',
        element: { type: 'index', value: middleIndex },
      });
      return true;
    }

    stepsLog.push({
      type: 'compare',
      elements: [
        { type: 'value', value: target },
        { type: 'index', value: middleIndex },
      ],
    });
    if (target < tmpList[middleIndex]) {
      stepsLog.push({
        type: 'reduce',
        range: { start: 0, end: middleIndex - 1 },
      });
      // tmpList = tmpList.slice(0, middleIndex);
      start = 0;
      end = middleIndex - 1;
      continue;
    }

    stepsLog.push({
      type: 'reduce',
      range: { start: middleIndex + 1, end: length - 1 },
    });
    // tmpList = tmpList.slice(middleIndex + 1);
    start = middleIndex + 1;
  }

  stepsLog.push({ type: 'notFound' });
  return false;
};

export default binaryOrdered;
