import React from 'react';
import { stepsLogT, logStepTypeT } from '../algos/types';
import { genid } from '../tools';

type propsT = {
  // type: 'searching' | 'sorting';
  info: { dataName: string; algoName: string };
  stepsLog: stepsLogT;
  data: number[];
  queue: {
    stepCB: () => void;
    length: number;
    currentStep: number;
    stepDuration: number;
  };
};

export default function AlgoAnimation(props: propsT) {
  const barsRefs = React.useRef<(HTMLElement | null)[]>([]).current;
  let cellRef = React.useRef<HTMLElement | null>(null).current;

  // TODO: colors are not enough
  const stepsActionsColor = {
    idle: ['rgb(147 197 253)'],
    compare: ['#eaea15'],
    swap: ['#ea5a15'],
    replace: ['red', 'green'],
    reduce: ['#ccc'],
    shift: ['#999', '#bada55'],
    calc: ['#bada55', '#bada55'],
    push: ['green'],
    split: ['#bada55', '#999'],
    concat: ['#bada55', '#bada55'],
  };

  type stepsActionsT = {
    [key: string]: {
      do: (step) => void;
      undo: (step, end: boolean) => void;
    };
  };

  const domUtilities = {
  };

  const stepsActions: stepsActionsT = {
    compare: {
      do: (step) => {
        //TODO: indicate comparing index with a value

        if (step.elements[0].type == 'index') {
          const firstIndex = step.elements[0].value;
          barsRefs[firstIndex].style.background =
            stepsActionsColor[step.type][0];
        }

        if (step.elements[1].type == 'index') {
          const secondIndex = step.elements[1].value;
          barsRefs[secondIndex].style.background =
            stepsActionsColor[step.type][0];
        }
      },
      undo: (step, end) => {
        if (step.elements[0].type == 'index') {
          const firstIndex = step.elements[0].value;
          barsRefs[firstIndex].style.background = stepsActionsColor['idle'][0];
        }
        if (step.elements[1].type == 'index') {
          const secondIndex = step.elements[1].value;
          barsRefs[secondIndex].style.background = stepsActionsColor['idle'][0];
        }

        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
    swap: {
      do: (step) => {
        const firstIndex = step.elements[0].value;
        const secondIndex = step.elements[1].value;
        barsRefs[firstIndex].style.background = stepsActionsColor[step.type][0];
        barsRefs[secondIndex].style.background =
          stepsActionsColor[step.type][0];

        // swaping heights instead of elements
        const firstElmHeight = barsRefs[firstIndex].style.height;
        barsRefs[firstIndex].style.height = barsRefs[secondIndex].style.height;
        barsRefs[secondIndex].style.height = firstElmHeight;
      },
      undo: (step, end) => {
        const firstIndex = step.elements[0].value;
        const secondIndex = step.elements[1].value;
        barsRefs[firstIndex].style.background = stepsActionsColor['idle'][0];
        barsRefs[secondIndex].style.background = stepsActionsColor['idle'][0];

        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
    replace: {
      do: (step) => {
        const indexToReplace = step.elements[0].value;
        const valueToReplaceWith = step.elements[1].value;

        barsRefs[indexToReplace].style.background = stepsActionsColor[step.type][0];
        barsRefs[indexToReplace].style.height = `${valueToReplaceWith}px`;
      },
      undo: (step, end) => {
        const indexToReplace = step.elements[0].value;
        barsRefs[indexToReplace].style.background = stepsActionsColor['idle'][0];
        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
    reduce: {
      do: (step) => {
        const start = step.range.start;
        const end = step.range.end;
        for (let i = start; i <= end; i++) {
          barsRefs[i].style.background = stepsActionsColor[step.type][0];
        }
      },
      undo: (step, end) => {
        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
    shift: {
      do: (step) => {
        // TODO: the "to" index is not needed, direction is enough
        const from = step.elements.from;
        const to = step.elements.to;

        // shifting an item and shade(kind of hiding) it's first position
        // barsRefs[to] = barsRefs[from];
        barsRefs[from].style.background = stepsActionsColor[step.type][0];
        barsRefs[to].style.background = stepsActionsColor[step.type][1];

        // shifting
        barsRefs[to].style.height = barsRefs[from].style.height;
      },
      undo: (step, end) => {
        const from = step.elements.from;
        const to = step.elements.to;
        barsRefs[from].style.background = stepsActionsColor['idle'][0];
        barsRefs[to].style.background = stepsActionsColor['idle'][0];
        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
    calc: {
      do: (step) => {
        // TODO: show some calculating animation
      },
      undo: (step, end) => {
        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
    push: {
      do: (step) => {
        // TODO: find a way to visualize both of lists and push to the second list
      },
      undo: (step, end) => {
        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
    split: {
      do: (step) => {
        for (let i = 0; i < step.chunks.length; i++) {
          // coloring both splited chunks
          const start = step.chunks[i].start;
          const end = step.chunks[i].end;
          for (let k = start; k <= end; k++) {
            barsRefs[k].style.background = stepsActionsColor[step.type][i];
          }
        }
      },
      undo: (step, end) => {
        for (let i = 0; i < step.chunks.length; i++) {
          // uncoloring both splited chunks
          const start = step.chunks[i].start;
          const end = step.chunks[i].end;
          for (let k = start; k <= end; k++) {
            barsRefs[k].style.background = stepsActionsColor['idle'][0];
          }
        }
        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
    concat: {
      do: (step) => {
        for (let i = 0; i < step.chunks.length; i++) {
          const start = step.chunks[i].start;
          const end = step.chunks[i].end;

          // coloring both concatenated chunks
          for (let k = start; k <= end; k++) {
            barsRefs[k].style.background = stepsActionsColor[step.type][i];
          }
        }
      },
      undo: (step, end) => {
        for (let i = 0; i < step.chunks.length; i++) {
          const start = step.chunks[i].start;
          const end = step.chunks[i].end;

          // uncoloring both concatenated chunks
          for (let k = start; k <= end; k++) {
            barsRefs[k].style.background = stepsActionsColor['idle'][i];
          }
        }
        if (end) {
          cellRef?.classList.add('algoDone');
        }
      },
    },
  };

  props.queue.length = props.stepsLog.length;
  props.queue.currentStep = 0;
  props.queue.stepDuration = 200;
  const step = () => {
    if (props.queue.currentStep >= props.queue.length) {
      console.log('no more steps');
      return;
    }
    // console.log(barsRefs)
    // TODO: find a way to fix the types problem
    // TODO: the second item in elements might be value|index, add a condition
    // TODO: add a final step in the algos implementation
    // TODO: abstract steps actions and add a revert-step acion to it
    // props.stepsLog.forEach((step) => {
    // TODO: manage timing
    const currentStep = props.stepsLog[props.queue.currentStep];
    // console.log(currentStep);
    // if (props.info.algoName == 'insertion') {
    // }
    stepsActions[currentStep.type].do(currentStep);
    setTimeout(() => {
      let end = false;
      if (props.queue.length === props.queue.currentStep) {
        end = true;
      }
      stepsActions[currentStep.type].undo(currentStep, end);
    }, props.queue.stepDuration / 1.5);

    props.queue.currentStep++;
  };
  // console.log('set cb');
  props.queue.stepCB = step;

  return (
    <ul
      ref={(el) => (cellRef = el)}
      className={`relative p-1 m-1 text-center h-[5.5rem] border-2 border-green-500 flex gap-1`}
    >
      {props.data.map((bar, index) => {
        return (
          <li
            key={index}
            data-value={bar}
            ref={(el) => barsRefs.push(el)}
            data-bar-value={bar}
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
