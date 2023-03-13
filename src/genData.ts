import Tools from './tools';

const listLengh = 10;
const maxValue = 50;
const uniformedStep = maxValue / listLengh;
const unique = {true: true, false: false}

const genList = (
  cb: (i: number, list: number[]) => number,
  unique: boolean
) => {
  const list: number[] = [];
  for (let i = 0; i < listLengh; ) {
    const randomInt = cb(i, list);
    // console.log(list)
    // console.log(list.includes(randomInt), randomInt)
    if (!list.includes(randomInt) || !unique) {
      i++;
      list.push(randomInt);
      // console.log('rand', randomInt)
    }
  }
  return list;
};

const sorted = () => {
  return genList((i: number, list: number[]) => {
    const min = list?.[i - 1] ?? i; //using last value as the min
    // console.log('list', list);
    const randomInt = Tools.randInt(min ? min : 0, min + uniformedStep * 2);
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
    return randomInt;
  }, unique.true);
};
const nearlySorted = () => {
  return genList((i: number, list: number[]) => {
    const ordered = Math.random() > 0.2;
    // const ordered = true;
    const lastInt = list?.[i - 1] ?? i;
    const min = ordered ? lastInt : i;
    // const min = list?.[i - 1] ?? i;
    // console.log('list', list);
    const randomInt = Tools.randInt(min ? min : 0, min + uniformedStep * 2);
    // console.log(min, min + uniformedStep, randomInt);
    return randomInt;
  }, unique.true);
};
// TODO: make it litterally is it sounds: first half sorted
const halfSorted = () => {
  return genList((i: number, list: number[]) => {
    const ordered = Math.random() > 0.5;
    const min = ordered ? list?.[i] ?? i : i;
    // console.log('list', list);
    const randomInt = Tools.randInt(min ? min : 1, maxValue);
    // console.log(min, min + uniformedStep, randomInt);
    return randomInt;
  }, unique.true);
};
const random = () => {
  return genList((i: number, list: number[]) => {
    return Tools.randInt(1, maxValue);
  }, unique.true);
};
const fewUnique = () => {
  return genList((i: number, list: number[]) => {
    // TODO: limit the number of duplication to a min and max
    const unique = Math.random() > 0.7;
    // console.log(unique)
    const randomInt = unique || list.length == 0
      ? Tools.randInt(1, maxValue)
      : list[Tools.randInt(0, list.length - 1)];
    return randomInt;
  }, unique.false);
};
const uniformed = () => {
  const randGap = Tools.randInt(2, uniformedStep);
  const sortedList = genList((i: number, list: number[]) => {
    const newNumber = Math.floor(
      list?.[i - 1] ? list[i - 1] + randGap : uniformedStep * 2
    );
    return newNumber;
  }, unique.true);

  // return shuffled list
  return sortedList.sort(() => {
    const fiftyChance = 0.5 - Math.random();
    return fiftyChance; // either 0 or non-0
  });
};

export default [
  sorted,
  reversed,
  nearlySorted,
  halfSorted,
  random,
  fewUnique,
  uniformed,
];
