import { stepsLogT } from '../types';

// TODO: use start and end instead of slice.
const quickSelect = (list: number[], target: number, stepsLog: stepsLogT) => {
  let tmpList = [...list];
  while (tmpList.length) {
    // STEP 1: place the pivot in the right position
    let pivot = tmpList.at(-1);
    let swapper = -1;
    let i = 0;
    for (; i < tmpList.length - 1; ) {
      stepsLog.push({
        type: 'compare',
        elements: [
          { type: 'index', value: i },
          { type: 'value', value: pivot },
        ],
      });
      if (tmpList[i] < pivot) {
        swapper++;

        // swapping
        stepsLog.push({
          type: 'swap',
          elements: [
            { type: 'index', value: i },
            { type: 'index', value: swapper },
          ],
        });
        if (tmpList[i] != tmpList[swapper]) {
          tmpList[i] ^= tmpList[swapper];
          tmpList[swapper] ^= tmpList[i];
          tmpList[i] ^= tmpList[swapper];
        }
      }
      i++;
    }
    // moving pivot to it's right position
    swapper++;
    stepsLog.push({
      type: 'swap',
      elements: [
        { type: 'index', value: i },
        { type: 'index', value: swapper },
      ],
    });
    if (tmpList[i] != tmpList[swapper]) {
      tmpList[i] ^= tmpList[swapper];
      tmpList[swapper] ^= tmpList[i];
      tmpList[i] ^= tmpList[swapper];
    }

    // STEP 2: binary searching
    stepsLog.push({
      type: 'compare',
      elements: [
        { type: 'value', value: target },
        { type: 'index', value: swapper },
      ],
    });
    if (target == tmpList[swapper]) {
      stepsLog.push({
        type: 'found',
        element: { type: 'index', value: swapper },
      });
      return true;
    }

    stepsLog.push({
      type: 'compare',
      elements: [
        { type: 'value', value: target },
        { type: 'index', value: swapper },
      ],
    });
    if (target < tmpList[swapper]) {
      stepsLog.push({ type: 'reduce', range: { start: 0, end: swapper - 1 } });
      tmpList = tmpList.slice(0, swapper);
      continue;
    }

    stepsLog.push({
      type: 'reduce',
      range: { start: swapper + 1, end: length - 1 },
    });
    tmpList = tmpList.slice(swapper + 1);
    continue;
  }

  stepsLog.push({ type: 'notFound' });
  return false;
};

export default quickSelect;
