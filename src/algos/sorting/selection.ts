const selection = (list: any[]) => {
  const output = [...list];

  for (let i = 0; i < output.length-1; i++) {
    let minSelected = i;
    for (let j = i + 1; j < output.length; j++) {
      if (output[minSelected] > output[j]) {
        minSelected = j;
      }
    }

    // xoring same value with itself produces 0.
    if (minSelected != i) {
      output[i] ^= output[minSelected];
      output[minSelected] ^= output[i];
      output[i] ^= output[minSelected];
    }
  }

  return output;
};

export default selection;
