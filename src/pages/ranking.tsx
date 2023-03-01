import React from 'react';
import algorithms from '../algos/index';
import genData from '../genData';
import { stepsLogT } from '../algos/types';

import AlgoAnimation from '../components/algoAnimation';

export default function Ranking() {
  const [tabState, setTabState] = React.useState<'sorting' | 'searching'>(
    'sorting'
  );

  const cbQueueRef = React.useRef<{
    [key: string]: { stepCB: () => void; length: number; currentStep: number };
  }>({}).current;
  const domRefs = React.useRef<{ [key: string]: HTMLElement | null }>(
    {}
  ).current;

  // run step that run the next step

  // my context switcher
  const runSteps = (e) => {
    if (e.target.disabled) {
      return;
    }

    e.target.class = `border-gray text-gray pointer-forbidden border-2 rounded-md px-3 py-1`;
    e.target.disabled = true;

    // const cellsList = [Object.values(cbQueueRef)[0]];
    // cellsList.forEach((cb) => {
    let cellsDoneCounter = {
      counter: 0,
      inc: () => {
        cellsDoneCounter.counter++;
        if(cellsDoneCounter.counter == Object.keys(cbQueueRef).length){
          e.target.class = `border-blue-400 border-2 rounded-md px-3 py-1`;
          e.target.disabled = false;
        }
      },
    };
    Object.values(cbQueueRef).forEach((cb) => {
      const stepper = async () => {
        if (cb.currentStep >= cb.length) {
          cellsDoneCounter.inc()
          return;
        };
        await ((ms) => new Promise((r) => setTimeout(r, ms)))(100);
        cb.stepCB();
        stepper();
      };
      stepper();
    });
  };

  const genCells = () => {
    const mapDataStructureToAlgorithm = (datum: () => number[]) => {
      const data = datum();

      if (tabState == 'sorting') {
        return algorithms[tabState].map((algo) => {
          const stepsLog: stepsLogT = [];
          // console.log(algo.name)
          algo(data, stepsLog);
          // console.log('algoRun: ', `[${tabState}]`, datum.name, '=>', algo.name)
          const cellCbQueueKey = datum.name + '' + algo.name;
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
      return algorithms[tabState].map((algo) => {
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
    <main>
      <table>
        <thead>
          <tr>
            <th>
              <button
                ref={(el) => {
                  domRefs.playButton = el;
                }}
                onClick={runSteps}
                className={`border-blue-400 border-2 rounded-md px-3 py-1`}
              >
                play All
              </button>
            </th>
            {algorithms[tabState].map((algo) => {
              return <th key={`${algo.name}`}>{algo.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Object.keys(tableCells).map((ItemKey) => {
            return (
              <tr key={`${ItemKey}`} className={``}>
                <th>{ItemKey}</th>
                {tableCells[ItemKey]}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
