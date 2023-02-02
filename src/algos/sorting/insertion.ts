const insertion = (inputList: any[]) => {
  const output = [...inputList];

  for (let i = 1; i < output.length; i++) {
    let tmp = output[i];
    let j = i-1;

    while(j >= 0 && tmp < output[j]) {
      output[j+1] = output[j];
      j--;
    }

    if (tmp != output[i]) {
      output[j+1] = tmp;
    }
  }

  return output;
};

export default insertion;
