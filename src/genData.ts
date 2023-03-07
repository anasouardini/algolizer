import { randInt } from './tools';

const listLengh = 10;

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
      i ++;
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
    const randomInt = randInt(min ? min : 0, min + 10);
    // console.log(min, min + 10, randomInt);
    return randomInt;
  }, true);
};
const nearlySorted = () => {
  return genList((i: number, list: number[]) => {
    const ordered = Math.random() > 0.2;
    // const ordered = true;
    const lastInt = list?.[i - 1] ?? i;
    const min = ordered ? lastInt : i;
    // const min = list?.[i - 1] ?? i;
    // console.log('list', list);
    const randomInt = randInt(min ? min : 0, min + 10);
    // console.log(min, min + 10, randomInt);
    return randomInt;
  }, true);
};
// TODO: make it litterally is it sounds: first half sorted
const halfSorted = () => {
  return genList((i: number, list: number[]) => {
    const ordered = Math.random() > 0.5;
    const min = ordered ? list?.[i] ?? i : i;
    // console.log('list', list);
    const randomInt = randInt(min ? min : 1, 50);
    // console.log(min, min + 10, randomInt);
    return randomInt;
  }, true);
};
const random = () => {
  return genList((i: number, list: number[]) => {
    return randInt(1, 50);
  }, true);
};
const fewUnique = () => {
  return genList((i: number, list: number[]) => {
    // TODO: limit the number of duplication to a min and max
    const unique = Math.random() > 0.7;
    const randomInt = unique
      ? randInt(1, 50)
      : list[randInt(1, list.length - 1)];
    return randomInt;
  }, false);
};
const uniformed = () => {
  const randGap = randInt(2, 5);
  const sortedList = genList((i: number, list: number[]) => {
    const newNumber = Math.floor(list?.[i-1] ? list[i - 1] + randGap : 10);
    return newNumber;
  }, true);

  // return shuffled list
  return sortedList.sort(()=>0.5-Math.random());
};

export default [
  sorted,
  nearlySorted,
  halfSorted,
  random,
  fewUnique,
  uniformed,
];
