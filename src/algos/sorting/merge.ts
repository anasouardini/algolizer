const merge = (list: number[]) => {
  const output = [...list];

  const mergeSrt = (outputArg: number[]) => {
    if (outputArg && outputArg.length < 2) {
      return outputArg;
    }

    // split
    let leftArr = outputArg.slice(0, outputArg.length / 2);
    let rightArr = outputArg.slice(outputArg.length / 2);
    leftArr = mergeSrt(leftArr as []) as [];
    rightArr = mergeSrt(rightArr as []) as [];

    // sort
    let sorted = [];
    let l = 0;
    let r = 0;
    while (l < leftArr.length && r < rightArr.length) {
      if (leftArr[l] < rightArr[r]) {
        sorted.push(leftArr[l]);
        l++;
        continue;
      }

      sorted.push(rightArr[r]);
      r++;
    }
    if (l < leftArr.length) {
      sorted = [...sorted, ...leftArr.slice(l)];
    } else {
      sorted = [...sorted, ...rightArr.slice(r)];
    }

    return sorted;
  };

  return mergeSrt(output);
};

export default merge;
