const bubble = (list: any[]) => {
  const output = [...list];

  // let i=1 in the outer array is like j<output.length-i-1 in the outer one
  for (let i = 1; i < output.length; i++) {
    for (let j = 0; j < output.length-i; j++) {
      if (output[j] > output[j+1]) {
        output[j] ^= output[j+1];
        output[j+1] ^= output[j];
        output[j] ^= output[j+1];
      }
    }
  }

  return output;
};

export default bubble;
