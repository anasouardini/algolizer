const selection = (list: any[]) => {
  const output = [...list];

  let selected = null;

  for (let i = 0; i < output.length; i++) {
    selected = i;
    for (let j = i + 1; j < output.length; j++) {
      if (output[selected] > output[j]) {
        selected = j;
      }
    }

    // xoring same value with itself produces 0.
    if (selected != i) {
      output[i] ^= output[selected];
      output[selected] ^= output[i];
      output[i] ^= output[selected];
    }
  }

  return output;
};

export default selection;
