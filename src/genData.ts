import { randInt } from './tools';

const step = 2;
const listLengh = 10 * step;

const genList = (cb: (i: number, list: number[]) => number) => {
  const list: number[] = [];
  for (let i = 0; i < listLengh; ) {
    const randomInt = cb(i, list);
    // console.log(list)
    // console.log(list.includes(randomInt), randomInt)
    if (!list.includes(randomInt)) {
      i += step;
      list.push(randomInt);
      // console.log('rand', randomInt)
    }
  }
  return list;
};

const sorted = () => {
  return genList((i: number, list: number[]) => {
    const min = list?.[i / step - 1] ?? i; //using last value as the min
    // console.log('list', list);
    const randomInt = randInt(min, min + 10);
    // console.log(min, min + 10, randomInt);
    return randomInt;
  });
};
const nearlySorted = () => {
  return genList((i: number, list: number[]) => {
    const ordered = Math.random() > 0.2;
    // const ordered = true;
    const lastInt = list?.[i / step - 1] ?? i;
    const min = ordered ? lastInt : i;
    // const min = list?.[i / step - 1] ?? i;
    // console.log('list', list);
    const randomInt = randInt(min, min + 10);
    // console.log(min, min + 10, randomInt);
    return randomInt;
  });
};
const halfSorted = () => {
  return genList((i: number, list: number[]) => {
    const ordered = Math.random() > 0.5;
    const min = ordered ? list?.[i / step] ?? i : i;
    // console.log('list', list);
    const randomInt = randInt(min, 50);
    // console.log(min, min + 10, randomInt);
    return randomInt;
  });
};
const random = () => {
  return genList((i: number, list: number[]) => {
    return randInt(0, 50);
  });
};
const fewUnique = () => [3, 55, 5, 0, 12, 2, 4, 23, 1];
const uniformed = () => [3, 55, 5, 0, 12, 2, 4, 23, 1];
const uniformedWide = () => [3, 55, 5, 0, 12, 2, 4, 23, 1];

export default [
  sorted,
  nearlySorted,
  halfSorted,
  random,
  fewUnique,
  uniformed,
  uniformedWide,
];
