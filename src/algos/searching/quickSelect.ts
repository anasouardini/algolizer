const quickSelect = (list: any[], target: number) => {
  let tmpList = [...list];
  while (tmpList.length) {
    // STEP 1: place the pivot in the right position
    let pivot = tmpList.at(-1);
    let swapper = -1;
    let i = 0;
    for(;i<tmpList.length-1;){
      if(tmpList[i] < pivot){
        swapper++;

        // swapping
        if(tmpList[i] != tmpList[swapper]){
          tmpList[i] ^= tmpList[swapper];
          tmpList[swapper] ^= tmpList[i];
          tmpList[i] ^= tmpList[swapper];
        }
      }
      i++;
    }
    // moving pivot to it's right position
    swapper++;
    if(tmpList[i] != tmpList[swapper]){
      tmpList[i] ^= tmpList[swapper];
      tmpList[swapper] ^= tmpList[i];
      tmpList[i] ^= tmpList[swapper];
    }

    // STEP 2: binary searching
    if (target == tmpList[swapper]) return true;

    if (target < tmpList[swapper]) {
      tmpList = tmpList.slice(0, swapper);
      continue;
    }

    tmpList = tmpList.slice(swapper + 1);
    continue;
  }

  return false;
};

export default quickSelect;
