import React from 'react';
import { stepsLogT } from '../algos/types';

type propsT = {
  // type: 'searching' | 'sorting';
  stepsLog: stepsLogT;
  data: number[];
  queue: (() => void)[];
};

export default function AlgoAnimation(props: propsT) {

  const [count, setCount] = React.useState(0);
  const stateActions = {inc: ()=>setCount((st)=>st+1)}

  React.useEffect(() => {
    const step = () => {stateActions.inc()};
    props.queue.push({step, length: props.stepsLog.length});
  }, []);

  const visualizeSteps = () => {
    // TODO: perform step on visualized data
  };

  const visualizeData = () => {
    //
  };
  return <p className={`p-10 text-center`}>cell - {count}</p>;
}
