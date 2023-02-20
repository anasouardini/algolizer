import {stepsLogT} from '../types';

const linear = (list: number[], target:number, stepsLog:stepsLogT) => {
  for(let i=0; i<list.length; i++){
    stepsLog.push({type: 'compare', elements: [{type: 'index', value: i}, {type: 'value', value: target}]});
    if(list[i] == target){
      return true;
    }
  }

  return false;
};

export default linear;
