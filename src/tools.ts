const genid = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const randInt = (mi:number, ma:number) => {
  let min = Math.ceil(mi);
  let max = Math.floor(ma);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { genid, randInt };
