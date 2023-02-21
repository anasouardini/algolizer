import React from 'react';
import { stepsLogT } from '../algos/types';

type propsT = {
  // type: 'searching' | 'sorting';
  info: { dataName: string; algoName: string };
  stepsLog: stepsLogT;
  data: number[];
  queue: { stepCB: () => void; length: number; currentStep: number };
};

export default function AlgoAnimation(props: propsT) {
  const barsRefs = React.useRef<(HTMLElement | null)[]>([]).current;

  // TODO: a ref tath points to the bar/li element
  // TODO: use aboslute positioning for elements animation

  // const [count, setCount] = React.useState(0);
  // const stateActions = {inc: ()=>setCount((st)=>st+1)}

  // LOGGING STEPS
  // if (props.info.algoName == 'selection') {
  //   props.stepsLog.forEach((step) => {
  //     console.log(step.elements);
  //   });
  // }

  React.useEffect(() => {
    const step = () => {
      props.queue.currentStep++;

      // console.log(barsRefs)
      // TODO: find a way to fix the types problem
      // TODO: the second item in elements might be value|index, add a condition
      // TODO: add a final step in the algos implementation
      props.stepsLog.map((step) => {
        if (step.type == 'compare') {
          const firstIndex = step.elements[0].value;
          // const secondIndex = step.elements[1].value;
          // console.log(firstIndex);
          // console.log(props.info.algoName, props.info.dataName);
          // console.log(barsRefs[firstIndex])

          barsRefs[firstIndex].style.background = '#bada55';
          // barsRefs[secondIndex].style.background = '#bada55';
        } else if (step.type == 'swap') {
          let tmp;
          const firstIndex = step.elements[0].value;
          const secondIndex = step.elements[1].value;

          // swaping refs of bars
          tmp = barsRefs[firstIndex];
          barsRefs[firstIndex] = barsRefs[secondIndex];
          barsRefs[secondIndex] = tmp;
        } else if (step.type == 'replace') {
          const indexToReplace = step.elements[0].value;
          const valueToReplaceWith = step.elements[1].value;

          barsRefs[indexToReplace].style.height = barsRefs[valueToReplaceWith];
          barsRefs[indexToReplace].setAttribute(
            'data-value',
            barsRefs[valueToReplaceWith]
          );
        } else if (step.type == 'reduce') {
          const start = step.range.start;
          const end = step.range.end;
          for (let i = start; i <= end; i++) {
            barsRefs[i].style.background = '#ccc';
          }
        } else if (step.type == 'shift') {
          // TODO: the "to" index is not needed, direction is enough
          const from = step.elements.from;
          const to = step.elements.to;

          // shifting an item and shade(kind of hiding) it's first position
          barsRefs[to] = barsRefs[from];
          barsRefs[from].style.background = '#ccc';
        } else if (step.type == 'calc') {
          // TODO: show some calculating animation
        } else if (step.type == 'push') {
          // TODO: find a way to visualize both of lists and push to the second list
        } else if (step.type == 'split') {
          for (let i = 0; i < 2; i++) {
            const start = step.chunks[i].start;
            const end = step.chunks[i].end;

            // coloring both splited chunks
            for (let k = start; k <= end; k++) {
              barsRefs[k].style.background = i == 0 ? '#999' : '#ccc';
            }
          }
        } else if (step.type == 'concat') {
          for (let i = 0; i < 2; i++) {
            const start = step.chunks[i].start;
            const end = step.chunks[i].end;

            // coloring both concatenated chunks
            for (let k = start; k <= end; k++) {
              barsRefs[k].style.background = i == 0 ? '#7d7' : '#a0efa0';
            }
          }
        }
      });
    };

    props.queue.stepCB = step;
    props.queue.length = props.stepsLog.length;
    props.queue.currentStep = 0;
  }, []);

  return (
    <ul className={`p-1 text-center flex gap-1`}>
      {props.data.map((bar, index) => {
        return (
          <li
            key={index}
            data-value={bar}
            ref={(el) => barsRefs.push(el)}
            className={`h-${bar} w-[7px] bg-blue-300`}
          ></li>
        );
      })}
    </ul>
  );
}
