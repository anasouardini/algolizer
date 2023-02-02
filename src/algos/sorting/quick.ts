const quick = (list: any[]) => {
  const output = [...list];

  const quickSrt = (outputArg: number[]) => {
    if (outputArg && outputArg.length < 2) {
      return outputArg;
    }

    let pivot = outputArg.at(-1) as number;
    let swapper = -1;

    let i = 0;
    for (; i < outputArg.length - 1; i++) {
      if (outputArg[i] < pivot) {
        swapper++;
        if (outputArg[i] != outputArg[swapper]) {
          outputArg[i] ^= outputArg[swapper];
          outputArg[swapper] ^= outputArg[i];
          outputArg[i] ^= outputArg[swapper];
        }
      }
    }
    swapper++;
    if (outputArg[i] != outputArg[swapper]) {
      outputArg[i] ^= outputArg[swapper];
      outputArg[swapper] ^= outputArg[i];
      outputArg[i] ^= outputArg[swapper];
    }

    let leftArg = outputArg.slice(0, outputArg.indexOf(pivot));
    let rightArg = outputArg.slice(outputArg.indexOf(pivot) + 1);
    const left = quickSrt(leftArg as []) as [];
    const right = quickSrt(rightArg as []) as [];

    return [...left, pivot, ...right];
  };

  return quickSrt(output);
};

export default quick;
