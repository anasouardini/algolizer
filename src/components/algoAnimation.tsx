import React from 'react';
import { stepsLogT, logStepTypeT } from '../algos/types';
import Tools from '../tools';
import { FaForward } from 'react-icons/fa';

type rankInfoT = {
  time: number;
  algo2datum: number;
  datum2algo: number;
};
type propsT = {
  // type: 'searching' | 'sorting';
  stepsLog: stepsLogT;
  data: number[];
  queue: {
    info: { datumName: string; algoName: string };
    stepCB: () => void;
    rankCB: (rankInfo: rankInfoT) => void;
    length: number;
    running: boolean;
    selfRun: boolean;
    currentStep: number;
    stepDuration: number;
  };
};

export default function AlgoAnimation(props: propsT) {
console.log()
  const barsRefs = React.useRef<(HTMLElement | null)[]>([]).current;
  let cellRef = React.useRef<HTMLElement | null>(null).current;

  // TODO: add indicators of non color friendly steps
  const stepsActionsColor = {
    idle: ['rgb(147 197 253)'],
    compare: ['#eaea15'],
    swap: ['#ea5a15'],
    replace: ['red', 'green'],
    reduce: ['#ccc'],
    shift: ['#999', '#bada55'],
    calc: ['#bada55', '#bada55'],
    push: ['green'],
    split: ['#fa8a15', '#4a5a95'],
    concat: ['#bada55', '#4a5a95'],
  };

  type stepsActionsT = {
    [key: string]: {
      do: (step) => void;
      undo: (step) => void;
    };
  };

  // reset, useEffect holds until the dom is drawn
  React.useEffect(() => {
    // console.log(cellRef)
    cellRef?.querySelector('[data-show-done]')?.remove();
    // barsRefs.forEach((bar) => {
    //   if (bar) {
    //     bar.style.background = stepsActionsColor.idle[0];
    //   }
    // });
  });

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
      undo: (step) => {
        if (step.elements[0].type == 'index') {
          const firstIndex = step.elements[0].value;
          barsRefs[firstIndex].style.background = stepsActionsColor['idle'][0];
        }
        if (step.elements[1].type == 'index') {
          const secondIndex = step.elements[1].value;
          barsRefs[secondIndex].style.background = stepsActionsColor['idle'][0];
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
      undo: (step) => {
        const firstIndex = step.elements[0].value;
        const secondIndex = step.elements[1].value;
        barsRefs[firstIndex].style.background = stepsActionsColor.idle[0];
        barsRefs[secondIndex].style.background = stepsActionsColor.idle[0];
      },
    },
    replace: {
      do: (step) => {
        const indexToReplace = step.elements[0].value;
        const valueToReplaceWith = step.elements[1].value;

        barsRefs[indexToReplace].style.background =
          stepsActionsColor[step.type][0];
        barsRefs[indexToReplace].style.height = `${valueToReplaceWith}px`;
      },
      undo: (step) => {
        const indexToReplace = step.elements[0].value;
        barsRefs[indexToReplace].style.background =
          stepsActionsColor['idle'][0];
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
      undo: (step) => {},
    },
    shift: {
      do: (step) => {
        const from = step.elements.from;
        const to = step.elements.to;

        // shifting an item and shade(kind of hiding) it's first position
        // barsRefs[to] = barsRefs[from];
        barsRefs[from].style.background = stepsActionsColor[step.type][0];
        barsRefs[to].style.background = stepsActionsColor[step.type][1];

        // shifting
        barsRefs[to].style.height = barsRefs[from].style.height;
      },
      undo: (step) => {
        const from = step.elements.from;
        const to = step.elements.to;
        barsRefs[from].style.background = stepsActionsColor['idle'][0];
        barsRefs[to].style.background = stepsActionsColor['idle'][0];
      },
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
        for (let i = 0; i < step.chunks.length; i++) {
          // coloring both splited chunks
          // console.log(step);
          const start = step.chunks[i].start;
          const end = step.chunks[i].end;
          for (let k = start; k <= end; k++) {
            barsRefs[k].style.background = stepsActionsColor[step.type][i];
          }
        }
      },
      undo: (step) => {
        for (let i = 0; i < step.chunks.length; i++) {
          // uncoloring both splited chunks
          const start = step.chunks[i].start;
          const end = step.chunks[i].end;
          for (let k = start; k <= end; k++) {
            barsRefs[k].style.background = stepsActionsColor['idle'][0];
          }
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
      undo: (step) => {
        for (let i = 0; i < step.chunks.length; i++) {
          const start = step.chunks[i].start;
          const end = step.chunks[i].end;

          // coloring both concatenated chunks
          for (let k = start; k <= end; k++) {
            barsRefs[k].style.background = stepsActionsColor['idle'][0];
          }
        }
      },
    },
  };

  // do not override the props.queue, just add items
  props.queue.length = props.stepsLog.length;
  props.queue.currentStep = 0;
  props.queue.stepDuration = 200;
  props.queue.running = false; // not effective when re-rendering after a cell is running
  const step = () => {
    if (props.queue.currentStep >= props.queue.length) {
      console.log('already done')
      if(props.queue.running){
        props.queue.running = false;
      }

      return;
    }
    // console.log(barsRefs)
    // TODO: animate the value comparision
    // TODO: make sure timing is realistic

    const currentStep = props.stepsLog[props.queue.currentStep];
    stepsActions[currentStep.type].do(currentStep);
    setTimeout(() => {
      let end = props.queue.length === props.queue.currentStep;
      if (end) {
        if (props.queue.selfRun) {
          props.queue.selfRun = false;
          props.queue.running = false;
          showDone('✔', '2rem');
        }
      }

      stepsActions[currentStep.type].undo(currentStep);
    }, props.queue.stepDuration / 1.5);

    props.queue.currentStep++;
  };
  // console.log('set cb');
  props.queue.stepCB = step;

  const showDone = (content: string, size?: string) => {
    const showRank = document.createElement('div');
    showRank.setAttribute('data-show-done', '');
    showRank.setAttribute(
      'style',
      ` position: absolute;
        transform: translate(-0.25rem, -0.25rem);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${size ?? '1rem'};
        width: 100%;
        height: 100%;
        background: rgba(2, 5, 2, .2);
      `
    );
    showRank.innerText = content;
    cellRef?.appendChild(showRank);
  };

  const rank = (rankInfo: rankInfoT) => {
    let content = `${rankInfo.time ?? ''}`;
    content += `${rankInfo.datum2algo ? ' / ' + rankInfo.datum2algo : ''}`;
    content += `${rankInfo.algo2datum ? ' / ' + rankInfo.algo2datum : ''}`;
    showDone(content);
    // console.log(rankInfo);
    // show info to dom
  };
  props.queue.rankCB = rank;

  const runSteps = () => {
    props.queue.running = true;
    props.queue.selfRun = true;

    const stepper = async () => {
      if (
        props.queue.currentStep >= props.queue.length ||
        !props.queue.running
      ) {
        return;
      }

      await ((ms) => new Promise((r) => setTimeout(r, ms)))(
        props.queue.stepDuration
      );
      step();
      stepper();
    };
    stepper();
  };

  const pauseSteps = () => {
    props.queue.running = false;
  };

  return (
    <ul
      ref={(el) => (cellRef = el)}
      className={`relative p-1 m-1 text-center h-[5.5rem] border-2 border-green-500 flex gap-1`}
    >
      <div
        aria-label='controls'
        className={`absolute z-10 bottom-1 left-1 h-4 flex gap-2`}
      >
        <button
          onClick={() => {
            props.queue.selfRun = true;
            step();
          }}
        >
          <FaForward />
        </button>
        <button
          className={`text-green-600 hover:text-[1.1rem]`}
          onClick={runSteps}
        >
          <FaForward />
        </button>
        <button
          className={`text-green-600 hover:text-[1.1rem]`}
          onClick={pauseSteps}
        >
          <FaForward />
        </button>
      </div>
      {props.data.map((bar, index) => {
        return (
          <li
            key={index}
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
