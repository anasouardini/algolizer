import {stepsLogT} from '../types'

const binaryOrdered = (list: number[], target: number, stepsLog: stepsLogT) => {
  let tmpList = [...list];
  while (tmpList.length) {
    const middleIndex = Math.floor(tmpList.length / 2);

    stepsLog.push({type: 'compare', elements: [{type: 'value', value: target}, {type: 'index', value: middleIndex}]});
    if (target == tmpList[middleIndex]) return true;

    stepsLog.push({type: 'compare', elements: [{type: 'value', value: target}, {type: 'index', value: middleIndex}]});
    if (target < tmpList[middleIndex]) {
    stepsLog.push({type: 'reduce', range: {start: 0, end: middleIndex-1}});
      tmpList = tmpList.slice(0, middleIndex);
      continue;
    }

    stepsLog.push({type: 'reduce', range: {start: middleIndex+1, end: length-1}});
    tmpList = tmpList.slice(middleIndex + 1);
    continue;
  }

  return false;
};

export default binaryOrdered;
