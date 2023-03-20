import Tools from './tools';

const listLengh = 10;
const maxValue = 50;
const uniformedStep = maxValue / listLengh;
const unique = { true: true, false: false };

const genList = (
  cb: (i: number, list: number[]) => number,
  unique: boolean,
  duplicationLimit?: number
) => {
  const list: number[] = [];
  let notUniqueHelper;
  if (!unique) {
    notUniqueHelper = [
      { counter: 0, limit: listLengh - duplicationLimit }, // unique
      { counter: 0, limit: duplicationLimit }, // duplicated
    ];
  }

  for (let i = 0; i < listLengh; ) {
    const randomInt = cb(i, list);
    // console.log(list)
    // console.log(list.includes(randomInt), randomInt)
    const duplicated = list.includes(randomInt);

    if (!duplicated || !unique) {
      // this is not really effective
      if (!unique) {
        // console.log(duplicated)
        if (
          notUniqueHelper[Number(duplicated)].counter ===
          notUniqueHelper[Number(duplicated)].limit
        ) {
          continue;
        }

        notUniqueHelper[Number(duplicated)].counter++;
      }

      i++;
      list.push(randomInt);
    }
  }
  // console.log(notUniqueHelper);
  return list;
};

const sorted = () => {
  return genList((i: number, list: number[]) => {
    const min = list?.[i - 1] ?? i; //using last value as the min
    // console.log('list', list);
    const randomInt = Tools.randInt(min ? min : 1, min + uniformedStep * 2);
    // console.log(min, min + uniformedStep, randomInt);
    return randomInt;
  }, unique.true);
};
const reversed = () => {
  return genList((i: number, list: number[]) => {
    const max = list?.[i - 1] ?? maxValue; //using last value as the max
    // console.log('list', list);
    const randomInt = Tools.randInt(max - uniformedStep, max);
    // console.log(min, min + uniformedStep, randomInt);
    return Math.min(maxValue, randomInt);
  }, unique.true);
};
const nearlySorted = () => {
  return genList((i: number, list: number[]) => {
    const sorted = Math.random() > 0.4;
    // console.log(sorted)
    const lastInt = list?.[i - 1] ?? 1;
    let min = 1;
    let max = lastInt + uniformedStep * 3; // +1 saves me from an infinite loop
    if (sorted) {
      min = lastInt;
      max = min + uniformedStep * 2;
    }
    // const min = list?.[i - 1] ?? i;
    // console.log('list', list);
    const randomInt = Tools.randInt(min, max);
    // console.log(min, min + uniformedStep, randomInt);
    return Math.min(maxValue, randomInt);
  }, unique.true);
};

const random = () => {
  const randomList = genList((i: number, list: number[]) => {
    return Tools.randInt(1, maxValue);
  }, unique.true);
  return randomList;
};
const duplicated = () => {
  const list = genList(
    (i: number, list: number[]) => {
      const unique = Math.random() > 0.4;
      // console.log(unique)
      const randomInt =
        unique || list.length == 0
          ? Tools.randInt(1, maxValue)
          : list[Tools.randInt(0, list.length - 1)];
      return Math.min(maxValue, randomInt);
    },
    unique.false,
    listLengh - 3
  );
  return list;
  // return list.sort((a, b)=> a-b)
};
const uniformed = () => {
  const randGap = Tools.randInt(2, uniformedStep);
  const sortedList = genList((i: number, list: number[]) => {
    const newNumber = Math.floor(
      list?.[i - 1] ? list[i - 1] + randGap : uniformedStep
    );
    return newNumber;
  }, unique.true);

  // return shuffled list
  return sortedList.sort(() => {
    const fiftyChance = 0.5 - Math.random();
    return fiftyChance; // either 0 or non-0
  });
};

// fewUnique data list is causing interpolation
// -search to loop non-stop
export default {
  sorting: [
    sorted,
    reversed,
    nearlySorted,
    // halfSorted,
    random,
    duplicated,
    uniformed,
  ],
  searching: [
    sorted,
    reversed,
    nearlySorted,
    // halfSorted,
    random,
    uniformed,
  ],
};
