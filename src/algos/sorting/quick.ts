import { stepsLogT } from '../types';

const quick = (list: number[], stepsLog: stepsLogT) => {
  const output = [...list];

  const quickSrt = (
    outputArg: number[],
    start: number,
    end: number,
    stepsLog: stepsLogT
  ) => {
    // console.log(stepsLog)
    if (!outputArg || start >= end) {return}

    let pivot = end;
    let swapper = start - 1;

    let i = start;
    for (; i < end; i++) {
      stepsLog.push({
        type: 'compare',
        elements: [
          { type: 'index', value: i },
          { type: 'index', value: pivot },
        ],
      });
      if (outputArg[i] < outputArg[pivot]) {
        swapper++;
        stepsLog.push({
          type: 'swap',
          elements: [
            { type: 'index', value: i },
            { type: 'index', value: swapper },
          ],
        });
        if (outputArg[i] != outputArg[swapper]) {
          outputArg[i] ^= outputArg[swapper];
          outputArg[swapper] ^= outputArg[i];
          outputArg[i] ^= outputArg[swapper];
        }
      }
    }
    swapper++;
    pivot = swapper;
    stepsLog.push({
      type: 'swap',
      elements: [
        { type: 'index', value: i },
        { type: 'index', value: swapper },
      ],
    });
    if (outputArg[i] != outputArg[swapper]) {
      outputArg[i] ^= outputArg[swapper];
      outputArg[swapper] ^= outputArg[i];
      outputArg[i] ^= outputArg[swapper];
    }

    // eliminating an exception in the steps animation
    const chunks:{start: number, end:number}[] = [];
    if(end != pivot){chunks.push({start, end: pivot-1})}
    if(start != pivot){chunks.push({start: pivot-1, end})}
    stepsLog.push({
      type: 'split',
      chunks,
    });

    quickSrt(outputArg, start, pivot - 1, stepsLog);
    quickSrt(outputArg, pivot + 1, end, stepsLog);

    stepsLog.push({
      type: 'concat',
      chunks: [
        { start, end: pivot - 1 },
        { start: pivot, end: pivot },
        { start: pivot + 1, end },
      ],
    });
  };

  quickSrt(output, 0, output.length - 1, stepsLog);
  return output;
};

export default quick;
