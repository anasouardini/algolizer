import { stepsLogT } from '../types';

const linear = (list: number[], target: number, stepsLog: stepsLogT) => {
  for (let i = 0; i < list.length; i++) {
    stepsLog.push({
      type: 'compare',
      elements: [
        { type: 'index', value: i },
        { type: 'value', value: target },
      ],
    });
    if (list[i] == target) {
      stepsLog.push({ type: 'found', element: { type: 'index', value: i } });
      return true;
    }
  }

  stepsLog.push({ type: 'notFound' });
  return false;
};

export default linear;
