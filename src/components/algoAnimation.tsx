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
    append: ['#bada55', '#4a5a95'],
    found: ['#8aba95', '#8aba95'],
    highlight: ['#bada55'],
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

  // TODO: clean up algorithms and their steps. e.g concat is not used anymore.

  const changeBackground = (
    barIndex: number,
    stepType: string,
    colorIndex: number
  ) => {
    if (!barsRefs[barIndex]) {
      if (props.queue.info.algoName === 'interpolation') {
        // interpolation probe is giving indexes outside the scope of the list
        // so I just ignore it.
        return;
      }
      console.log(props.queue.info, stepType);
      return;
    }
    barsRefs[barIndex].style.background =
      stepsActionsColor[stepType][colorIndex];
  };

  const stepsActions: stepsActionsT = {
    compare: {
      do: (step) => {
        if (step.elements[0].type == 'index') {
          const firstIndex = step.elements[0].value;

          changeBackground(firstIndex, step.type, 0);
        }

        if (step.elements[1].type == 'index') {
          const secondIndex = step.elements[1].value;
          changeBackground(secondIndex, step.type, 0);
        }
      },
      undo: (step) => {
        if (step.elements[0].type == 'index') {
          const firstIndex = step.elements[0].value;
          changeBackground(firstIndex, 'idle', 0);
        }
        if (step.elements[1].type == 'index') {
          const secondIndex = step.elements[1].value;
          changeBackground(secondIndex, 'idle', 0);
        }
      },
    },
    swap: {
      do: (step) => {
        const firstIndex = step.elements[0].value;
        const secondIndex = step.elements[1].value;
        changeBackground(firstIndex, step.type, 0);
        changeBackground(secondIndex, step.type, 0);

        // swaping heights instead of elements
        const firstElmHeight = barsRefs[firstIndex].style.height;
        barsRefs[firstIndex].style.height = barsRefs[secondIndex].style.height;
        barsRefs[secondIndex].style.height = firstElmHeight;
      },
      undo: (step) => {
        const firstIndex = step.elements[0].value;
        const secondIndex = step.elements[1].value;
        changeBackground(firstIndex, 'idle', 0);
        changeBackground(secondIndex, 'idle', 0);
      },
    },
    replace: {
      do: (step) => {
        const indexToReplace = step.elements[0].value;
        const valueToReplaceWith = step.elements[1].value;

        changeBackground(indexToReplace, step.type, 0);
        barsRefs[indexToReplace].style.height = `${valueToReplaceWith}px`;
      },
      undo: (step) => {
        const indexToReplace = step.elements[0].value;
        changeBackground(indexToReplace, 'idle', 0);
      },
    },
    reduce: {
      do: (step) => {
        const start = step.range.start;
        const end = step.range.end;
        for (let i = start; i <= end; i++) {
          changeBackground(i, step.type, 0);
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
        changeBackground(from, step.type, 0);
        changeBackground(to, step.type, 1);

        // shifting
        barsRefs[to].style.height = barsRefs[from].style.height;
      },
      undo: (step) => {
        const from = step.elements.from;
        const to = step.elements.to;
        changeBackground(from, 'idle', 0);
        changeBackground(to, 'idle', 0);
      },
    },
    calc: {
      do: (step) => {},
      undo: (step) => {},
    },
    push: {
      do: (step) => {
        const pushValue = step.element.value;
        const pushIndex = step.element.index;
        const targetIndex = step.target.index;

        barsRefs[targetIndex].style.height = pushValue + 'px';
        // console.log(barsRefs[targetIndex], pushValue)
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
            changeBackground(k, step.type, i);
          }
        }
      },
      undo: (step) => {
        for (let i = 0; i < step.chunks.length; i++) {
          // uncoloring both splited chunks
          const start = step.chunks[i].start;
          const end = step.chunks[i].end;
          for (let k = start; k <= end; k++) {
            changeBackground(k, 'idle', 0);
          }
        }
      },
    },
    append: {
      do: (step) => {
        step.target.forEach((value, index) => {
          // console.log(barsRefs[step.source + index])
          barsRefs[step.source + index].style.height = value + 'px';
        });
      },
      undo: (step) => {},
    },
    highlight: {
      do: (step) => {
        for (let i = step.start; i <= step.end; i++) {
          changeBackground(i, step.type, 0);
        }
      },
      undo: (step) => {
        for (let i = step.start; i <= step.end; i++) {
          changeBackground(i, 'idle', 0);
        }
      },
    },
    found: {
      do: (step) => {
        // console.log(props.queue.info.algoName, props.queue.info.datumName, step.element.value)
        changeBackground(step.element.value, step.type, 0);
      },
      undo: (step) => {
        // barsRefs[step.element.value].style.background = stepsActionsColor['idle'][0];
      },
    },
    notFound: {
      do: (step) => {},
      undo: (step) => {},
    },
  };

  // do not override the props.queue, just add items
  props.queue.length = props.stepsLog.length;
  props.queue.currentStep = 0;
  props.queue.stepDuration = 200;
  props.queue.running = false; // not effective when re-rendering after a cell is running
  const step = () => {
    let end = props.queue.currentStep >= props.queue.length;
    if (end) {
      console.log('already done');

      // just in case
      if (props.queue.running) {
        props.queue.running = false;
      }

      return;
    }
    // console.log(barsRefs)
    // TODO: make sure timing is realistic

    const currentStep = props.stepsLog[props.queue.currentStep];
    // console.log(currentStep);
    // console.log(props.queue.info.algoName, props.queue.info.datumName, currentStep);
    try {
      stepsActions[currentStep.type].do(currentStep);
    } catch (e) {
      console.log(
        props.queue.info.algoName,
        props.queue.info.datumName,
        currentStep
      );
    }
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
      className={`relative p-1 m-1 text-center h-[5.5rem]
                  border-2 border-green-500 flex gap-1`}
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
              background: props.stepsLog.length
                ? stepsActionsColor.idle[0]
                : '#999',
              height: `${bar}px`,
            }}
            className={`w-[7px]`}
          ></li>
        );
      })}
    </ul>
  );
}
