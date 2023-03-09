import React from 'react';
import algorithms from '../algos/index';
import genData from '../genData';
import { stepsLogT } from '../algos/types';

import AlgoAnimation from '../components/algoAnimation';

export default function Ranking() {
  const [state, setState] = React.useState<{
    currentTab: 'sorting' | 'searching';
    rerender: boolean;
  }>({ currentTab: 'sorting', rerender: false });

  const cbQueueRef = React.useRef<{
    [key: string]: {
      stepCB: () => void;
      length: number;
      running: boolean;
      currentStep: number;
      stepDuration: number;
    };
  }>({}).current;
  // const domRefs = React.useRef<{ [key: string]: HTMLElement | null }>(
  //   {}
  // ).current;
  const stepperStateRef = React.useRef<{ running: boolean }>({
    running: false,
  }).current;

  // TODO: fewUniaue list is not compatible with algorithms
  // TODO: rank data from algo perspective and same for algorithms: dataRank/algorithmRank
  // TODO: show time rank for cells
  // TODO: make sure the numbers in the input list are not mutated; round the heights and compare the numbers
  // write a test function for it, it could used whenever you change something.
  // TODO: add a restarting option without generating new random numbers list

  // my context switcher
  const runSteps = (e) => {
    // console.log(cbQueueRef)

    const buttonTexts: string[] = ['Play All', 'Pause All'];

    stepperStateRef.running = !stepperStateRef.running;
    e.target.innerText = buttonTexts[Number(stepperStateRef.running)];

    if (stepperStateRef.running === false) {
      Object.values(cbQueueRef).forEach((cell) => {
        cell.running = stepperStateRef.running;
      });
      return;
    }

    // const cellsList = [Object.values(cbQueueRef)[0]];
    // cellsList.forEach((cb) => {
    let cellsDoneCounter = {
      counter: 0,
      inc: () => {
        cellsDoneCounter.counter++;
        if (cellsDoneCounter.counter == Object.keys(cbQueueRef).length) {
          e.target.innerText = 'Play All';
        }
      },
    };
    Object.values(cbQueueRef).forEach((cell) => {
      const stepper = async () => {
        if (cell.running === false) {
          console.log('stopping...');
          e.target.innerText = 'Play All';
          return;
        }

        if (cell.currentStep >= cell.length) {
          cellsDoneCounter.inc();
          return;
        }
        await ((ms) => new Promise((r) => setTimeout(r, ms)))(
          cell.stepDuration
        );
        cell.stepCB();
        stepper();
      };

      // do not run the cell when it's already running, it'll potentially speed it up.
      if (!cell.running) {
        cell.running = true;
        stepper();
      }
    });
  };

  const oneStep = () => {
    Object.values(cbQueueRef).forEach((cell) => {
      cell.stepCB();
    });
  };

  const regenerateCells = (e) => {
    // stopping all cells before restarting, or else you have to reload to stop them.
    Object.values(cbQueueRef).forEach((cell) => {
      cell.running = false;
      stepperStateRef.running = false;
    });

    const stateCpy = structuredClone(state);
    stateCpy.rerender = !stateCpy.rerender;
    setState(stateCpy);
  };

  const genCells = () => {
    const mapDataStructureToAlgorithm = (datum: () => number[]) => {
      const data = datum();

      if (state.currentTab == 'sorting') {
        return algorithms[state.currentTab].map((algo) => {
          const stepsLog: stepsLogT = [];
          // console.log(algo.name)
          const output = algo(data, stepsLog);
          // console.log('algoRun: ', datum.name, '=>', algo.name)
          // console.log(output)
          const cellCbQueueKey = datum.name + '' + algo.name;
          // console.log('gencells')
          cbQueueRef[cellCbQueueKey] = {};
          return (
            <td key={`${algo.name}-${datum.name}`}>
              <AlgoAnimation
                info={{ dataName: datum.name, algoName: algo.name }}
                data={data}
                stepsLog={stepsLog}
                queue={cbQueueRef[cellCbQueueKey]}
              />
            </td>
          );
        });
      }

      // TODO: set Random target
      // TODO: [opt] get searching vlaue from the user
      return algorithms[state.currentTab].map((algo) => {
        const stepsLog: stepsLogT = [];
        algo(data, randomTarget, stepsLog);
        return (
          <td key={`${algo.name}-${datum.name}`}>
            <AlgoAnimation
              data={datum()}
              stepsLog={stepsLog}
              queue={cbQueueRef}
            />
          </td>
        );
      });
    };

    return genData.reduce((acc: { [key: string]: JSX.Element[] }, dataItem) => {
      acc[dataItem.name] = mapDataStructureToAlgorithm(dataItem);
      return acc;
    }, {});
  };
  const tableCells = genCells();

  return (
    <main className={`p-5 flex flex-col items-center`}>
      <div aria-label='controls' className={`flex justify-center mb-8 gap-3`}>
        <button
          onClick={oneStep}
          className={`border-blue-400 border-2 rounded-md px-3 py-1`}
        >
          step
        </button>
        <button
          onClick={runSteps}
          className={`border-blue-400 border-2 rounded-md px-3 py-1`}
        >
          play All
        </button>
        <button
          onClick={regenerateCells}
          className={`border-blue-400 border-2 rounded-md px-3 py-1`}
        >
          Restart
        </button>
      </div>
      <table className={`text-gray-500`}>
        <thead>
          <tr>
            <th></th>
            {algorithms[state.currentTab].map((algo) => {
              return <th key={`${algo.name}`}>{algo.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Object.keys(tableCells).map((ItemKey) => {
            return (
              <tr key={`${ItemKey}`} className={``}>
                <th className={`text-left`}>{ItemKey}</th>
                {tableCells[ItemKey]}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
