import { stepsLogT } from '../types';

const interpolation = (list: number[], target: number, stepsLog: stepsLogT) => {
  const interpolation = (
    list: number[],
    start: number,
    end: number,
    target: number,
    stepsLog: stepsLogT
  ) => {
    while (end-start > 0) {
      // mid = Lo + ((Hi - Lo) / (A[Hi] - A[Lo])) * (X - A[Lo])
      const part1 = ((target - list[start]) * (end - start));
      const part2 = (list[end] - list[start]);
      const probe = Math.floor(start + (part1 / part2));
      stepsLog.push({ type: 'calc', value: probe });

      stepsLog.push({
        type: 'compare',
        elements: [
          { type: 'value', value: target },
          { type: 'index', value: probe },
        ],
      });
      if (target == list[probe]) {
        stepsLog.push({
          type: 'found',
          element: { type: 'index', value: probe },
        });
        return true;
      }

      stepsLog.push({
        type: 'compare',
        elements: [
          { type: 'value', value: target },
          { type: 'index', value: probe },
        ],
      });
      if (target < list[probe]) {
        stepsLog.push({ type: 'reduce', range: { start: 0, end: probe } });
        end = probe;
        continue;
      }

      stepsLog.push({
        type: 'reduce',
        range: { start: probe + 1, end},
      });
      start = probe+1;
    }

    stepsLog.push({ type: 'notFound' });
    return false;
  };
  interpolation(list, 0, list.length-1, target, stepsLog);
};

export default interpolation;
