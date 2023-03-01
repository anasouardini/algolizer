import React from 'react';
import { stepsLogT, logStepTypeT } from '../algos/types';

type propsT = {
  // type: 'searching' | 'sorting';
  info: { dataName: string; algoName: string };
  stepsLog: stepsLogT;
  data: number[];
  queue: { stepCB: () => void; length: number; currentStep: number };
};

export default function AlgoAnimation(props: propsT) {
  const barsRefs = React.useRef<(HTMLElement | null)[]>([]).current;

  // LOGGING STEPS
  // if (props.info.algoName == 'selection') {
  //   props.stepsLog.forEach((step) => {
  //     console.log(step.elements);
  //   });
  // }

  // TODO: colors are not enough
  const stepsActionsColor = {
    idle: ['rgb(147 197 253)'],
    compare: ['yellow', 'yellow'],
    swap: ['#bada55', '#bada55'],
    replace: ['red', 'green'],
    reduce: ['#ccc'],
    shift: ['#bada55', '#bada55'],
    calc: ['#bada55', '#bada55'],
    push: ['green'],
    split: ['#bada55', '#bada55'],
    concat: ['#bada55', '#bada55'],
  };

  React.useEffect(() => {
    type stepsActionsT = {
      [key: string]: { do: (step) => void; undo: (step) => void };
    };

    const domUtilities = {
      swap: (firstElm:HTMLElement|null, secondElm:HTMLElement|null)=>{
          if (firstElm != null && secondElm != null) {
            let firstElmClone = firstElm?.cloneNode();
            secondElm.after(firstElmClone);
            firstElm.after(secondElm);
            firstElm.remove();
          }
      }
    }

    const stepsActions: stepsActionsT = {
      compare: {
        do: (step) => {
          // console.log(step)
          const firstIndex = step.elements[0].value;
          // const secondIndex = step.elements[1].value;
          // console.log(firstIndex);
          // console.log(props.info.algoName, props.info.dataName);
          // console.log(barsRefs[firstIndex])

          barsRefs[firstIndex].style.background =
            stepsActionsColor[step.type][0];
          // barsRefs[secondIndex].style.background = stepsActionsColor[step.type][1];
        },
        undo: (step) => {},
      },
      swap: {
        do: (step) => {
          const firstIndex = step.elements[0].value;
          const secondIndex = step.elements[1].value;

          // swaping refs of bars
          domUtilities.swap(barsRefs[firstIndex], barsRefs[secondIndex]);
        },
        undo: (step) => {},
      },
      replace: {
        do: (step) => {
          const indexToReplace = step.elements[0].value;
          const valueToReplaceWith = step.elements[1].value;

          barsRefs[indexToReplace].style.height = barsRefs[valueToReplaceWith];
          barsRefs[indexToReplace].setAttribute(
            'data-value',
            barsRefs[valueToReplaceWith]
          );
        },
        undo: (step) => {},
      },
      reduce: {
        do: (step) => {
          const start = step.range.start;
          const end = step.range.end;
          for (let i = start; i <= end; i++) {
            barsRefs[i].style.background = stepsActionsColor[step.type][0];
          }
        },
        undo: (step) => {},
      },
      shift: {
        do: (step) => {
          // TODO: the "to" index is not needed, direction is enough
          const from = step.elements.from;
          const to = step.elements.to;

          // shifting an item and shade(kind of hiding) it's first position
          barsRefs[to] = barsRefs[from];
          barsRefs[from].style.background = stepsActionsColor[step.type][0];
        },
        undo: (step) => {},
      },
      calc: {
        do: (step) => {
          // TODO: show some calculating animation
        },
        undo: (step) => {},
      },
      push: {
        do: (step) => {
          // TODO: find a way to visualize both of lists and push to the second list
        },
        undo: (step) => {},
      },
      split: {
        do: (step) => {
          for (let i = 0; i < 2; i++) {
            const start = step.chunks[i].start;
            const end = step.chunks[i].end;

            // coloring both splited chunks
            for (let k = start; k <= end; k++) {
              barsRefs[k].style.background = stepsActionsColor[step.type][i];
            }
          }
        },
        undo: (step) => {},
      },
      concat: {
        do: (step) => {
          for (let i = 0; i < 2; i++) {
            const start = step.chunks[i].start;
            const end = step.chunks[i].end;

            // coloring both concatenated chunks
            for (let k = start; k <= end; k++) {
              barsRefs[k].style.background = stepsActionsColor[step.type][i];
            }
          }
        },
        undo: (step) => {},
      },
    };

    const step = () => {
      // console.log(barsRefs)
      // TODO: find a way to fix the types problem
      // TODO: the second item in elements might be value|index, add a condition
      // TODO: add a final step in the algos implementation
      // TODO: abstract steps actions and add a revert-step acion to it
      // props.stepsLog.forEach((step) => {
      // TODO: manage timing
      // console.log(props.queue.currentStep);
      const currentStep = props.stepsLog[props.queue.currentStep];
      stepsActions[currentStep.type].do(currentStep);
      stepsActions[currentStep.type].undo(currentStep);
      // });

      props.queue.currentStep++;
    };

    props.queue.stepCB = step;
    props.queue.length = props.stepsLog.length;
    props.queue.currentStep = 0;
  }, []);

  return (
    <ul className={`p-1 m-1 text-center h-[5.5rem] border-2 border-green-500 flex gap-1`}>
      {props.data.map((bar, index) => {
        return (
          <li
            key={index}
            data-value={bar}
            ref={(el) => barsRefs.push(el)}
            style={{
              background: stepsActionsColor.idle[0],
              height: `${bar}px`,
            }}
            className={`w-[7px]`}
          ></li>
        );
      })}
    </ul>
  );
}
