const interpolation = (list: any[], target: number) => {
  let tmpList = [...list];
  while (tmpList.length) {
    const length = tmpList.length;
    // low + (high - low) * (targetValue - array[low]) / (array[high] -  array[low]);
    const part1 = 0 + (length-1 - 0);
    const part2 = (target - tmpList[0]);
    const part3 = (tmpList[length-1] -  tmpList[0]);
    const probe = Math.floor(part1 * part2 / part3);
    // return;

    if (target == tmpList[probe]) return true;

    if (target < tmpList[probe]) {
      tmpList = tmpList.slice(0, probe);
      continue;
    }

    tmpList = tmpList.slice(probe + 1);
    continue;
  }

  return false;
};

export default interpolation;
