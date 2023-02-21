import { stepsLogT } from '../types';

const quick = (list: number[], stepsLog: stepsLogT) => {
  const output = [...list];

  const quickSrt = (
    outputArg: number[],
    start: number = 0,
    end: number,
    stepsLog: stepsLogT
  ) => {
    // console.log(stepsLog)

    if (outputArg && end - start < 2) {
      return [];
    }


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

    stepsLog.push({
      type: 'split',
      chunks: [
        { start, end: pivot - 1 },
        { start: pivot - 1, end },
      ],
    });
    const left = quickSrt(outputArg, start, pivot - 1, stepsLog) as [];
    const right = quickSrt(outputArg, pivot + 1, end, stepsLog) as [];

    stepsLog.push({
      type: 'concat',
      chunks: [
        { start, end: pivot - 1 },
        { start: pivot, end: pivot },
        { start: pivot - 1, end },
      ],
    });
    return [...left, outputArg[pivot], ...right];
  };

  return quickSrt(output, 0, output.length - 1, stepsLog);
};

export default quick;
