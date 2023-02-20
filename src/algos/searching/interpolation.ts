import {stepsLogT} from '../types';

const interpolation = (list: number[], target: number, stepsLog:stepsLogT) => {
  let tmpList = [...list];
  while (tmpList.length) {
    const length = tmpList.length;
    // low + (high - low) * (targetValue - array[low]) / (array[high] -  array[low]);
    const part1 = 0 + (length-1 - 0);
    const part2 = (target - tmpList[0]);
    const part3 = (tmpList[length-1] -  tmpList[0]);
    const probe = Math.floor(part1 * part2 / part3);
    stepsLog.push({type: 'calc', value: probe});

    stepsLog.push({type: 'compare', elements: [{type: 'value', value: target}, {type: 'index', value: probe}]});
    if (target == tmpList[probe]) return true;

    stepsLog.push({type: 'compare', elements: [{type: 'value', value: target}, {type: 'index', value: probe}]});
    if (target < tmpList[probe]) {
    stepsLog.push({type: 'reduce', range: {start: 0, end: probe-1}});
      tmpList = tmpList.slice(0, probe);
      continue;
    }

    stepsLog.push({type: 'reduce', range: {start: probe+1, end: length-1}});
    tmpList = tmpList.slice(probe + 1);
    continue;
  }

  return false;
};

export default interpolation;
