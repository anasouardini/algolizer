const binaryOrdered = (list: any[], target: number) => {
  let tmpList = [...list];
  while (tmpList.length) {
    const middleIndex = Math.floor(tmpList.length / 2);

    if (target == tmpList[middleIndex]) return true;

    if (target < tmpList[middleIndex]) {
      tmpList = tmpList.slice(0, middleIndex);
      continue;
    }

    tmpList = tmpList.slice(middleIndex + 1);
    continue;
  }

  return false;
};

export default binaryOrdered;
