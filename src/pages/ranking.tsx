import React from 'react';
import algorithms from '../algos/index';
import genData from '../genData';
import { stepsLogT } from '../algos/types';
import Tools from '../tools';
import AlgoAnimation from '../components/algoAnimation';

// TODO: play all button should remove the "done" UI in self-runed cells

export default function Ranking() {
  const [state, setState] = React.useState<{
    currentTab: 'sorting' | 'searching';
    rerender: boolean;
    genNew: boolean;
  }>({ currentTab: 'sorting', rerender: false, genNew: true });
  const stateActions = {
    rerender: () => {
      const stateCpy = structuredClone(state);
      stateCpy.rerender = !stateCpy.rerender;
      setState(stateCpy);
    },
    oldCells: () => {
      const stateCpy = structuredClone(state);
      stateCpy.genNew = false;
      setState(stateCpy);
    },
    newCells: () => {
      const stateCpy = structuredClone(state);
      stateCpy.genNew = true;
      setState(stateCpy);
    },
    switchtab: (tab: string) => {
      const stateCpy = structuredClone(state);
      stateCpy.currentTab = tab;
      setState(stateCpy);
    },
  };

  type stateRefT = {
    buttons: { [key: string]: HTMLButtonElement };
    cellsStepCbList: {
      [key: string]: {
        info: { datumName: string; algoName: string };
        stepCB: () => void;
        rankCB: (rankInfo: {
          time: number;
          algo2datum: number;
          datum2algo: number;
        }) => void;
        length: number;
        running: boolean;
        currentStep: number;
        stepDuration: number;
      };
    };
    stepperState: { running: boolean };
    cellsRankCounters: {
      time: number;
      algo2datum: { [key: string]: number };
      datum2algo: { [key: string]: number };
    };
    lastRunData: {
      [key: string]: { barsList: number[]; stepsLog: stepsLogT };
    };
  };
  const stateRef = React.useRef<stateRefT>({
    buttons: {},
    cellsStepCbList: {},
    stepperState: { running: false },
    cellsRankCounters: {
      time: 1,
      algo2datum: {},
      datum2algo: {},
    },
    lastRunData: {},
  });
  const stateRefActions = {
    reset: () => {
      stateRef.current.stepperState.running = false;
      // stateRef.current.cellsStepCbList = {};

      if (stateRef.current.buttons.play) {
        stateRef.current.buttons.play.innerText = 'Play All';
      }

      //reset rank counters
      stateRef.current.cellsRankCounters.time = 1;
      Object.keys(stateRef.current.cellsRankCounters.algo2datum).forEach(
        (key) => {
          stateRef.current.cellsRankCounters.algo2datum[key] = 1;
        }
      );
      Object.keys(stateRef.current.cellsRankCounters.datum2algo).forEach(
        (key) => {
          stateRef.current.cellsRankCounters.datum2algo[key] = 1;
        }
      );
    },
    clearDataCache: () => {
      stateRef.current.lastRunData = {};
    },
    incRankCounters: (cellInfo: { algoName: string; datumName: string }) => {
      stateRef.current.cellsRankCounters.time++;
      stateRef.current.cellsRankCounters.algo2datum[cellInfo.algoName]++;
      stateRef.current.cellsRankCounters.datum2algo[cellInfo.datumName]++;
    },
  };

  type rankCellT = (
    cellInfo: { datumName: string; algoName: string },
    rankCB: (rankInfo: {
      time: number;
      algo2datum: number;
      datum2algo: number;
    }) => void
  ) => void;
  const rankCell: rankCellT = (cellInfo, rankCB) => {
    // console.log(cellInfo);
    rankCB({
      time: stateRef.current.cellsRankCounters.time,
      algo2datum:
        stateRef.current.cellsRankCounters.algo2datum[cellInfo.algoName],
      datum2algo:
        stateRef.current.cellsRankCounters.datum2algo[cellInfo.datumName],
    });

    stateRefActions.incRankCounters(cellInfo);
  };

  let cellsDoneCounter = {
    counter: 0,
    inc: (e) => {
      cellsDoneCounter.counter++;
      if (
        cellsDoneCounter.counter ==
        Object.keys(stateRef.current.cellsStepCbList).length
      ) {
        stateRef.current.buttons.play.innerText = 'Play All';
      }
    },
  };

  // my context switcher
  const runSteps = (e) => {
    // console.log(cbQueueRef)
    // stateRefActions.reset();
    const buttonTexts: string[] = ['Play All', 'Pause All'];

    stateRef.current.stepperState.running =
      !stateRef.current.stepperState.running;
    stateRef.current.buttons.play.innerText =
      buttonTexts[Number(stateRef.current.stepperState.running)];

    if (stateRef.current.stepperState.running === false) {
      Object.values(stateRef.current.cellsStepCbList).forEach((cell) => {
        cell.running = stateRef.current.stepperState.running;
      });
      return;
    }

    // const cellsList = [Object.values(cbQueueRef)[0]];
    // cellsList.forEach((cb) => {
    Object.values(stateRef.current.cellsStepCbList).forEach((cell) => {
      const stepper = async () => {
        if (cell.running === false) {
          // console.log('stopping...');
          stateRef.current.buttons.play.innerText = 'Play All';
          return;
        }

        if (cell.currentStep >= cell.length) {
          rankCell(cell.info, cell.rankCB);
          cellsDoneCounter.inc(e);
          return;
        }
        await ((ms) => new Promise((r) => setTimeout(r, ms)))(
          cell.stepDuration
        );
        cell.stepCB();
        stepper();
      };

      // this should prevent it from replaying when playing from a paused state.
      // if this logic removed, the ranking will not be accurate
      if (cell.currentStep >= cell.length) {
        return;
      }
      // do not run the cell when it's already running, it'll potentially speed it up.
      if (!cell.running) {
        cell.running = true;
        stepper();
      }
    });
  };

  const oneStep = () => {
    Object.values(stateRef.current.cellsStepCbList).forEach((cell) => {
      if (cell.currentStep < cell.length) {
        cell.stepCB();
      }
    });
  };

  const drawCell = (cellCbQueueKey: string) => {
    return (
      <td key={`${cellCbQueueKey}-${Tools.genid(10)}`}>
        <AlgoAnimation
          data={stateRef.current.lastRunData[cellCbQueueKey].barsList}
          stepsLog={stateRef.current.lastRunData[cellCbQueueKey].stepsLog}
          queue={stateRef.current.cellsStepCbList[cellCbQueueKey]}
        />
      </td>
    );
  };

  const genCells = () => {
    // reset
    stateRefActions.reset();

    return genData[state.currentTab].reduce(
      (acc: { [key: string]: JSX.Element[] }, datum) => {
        stateRef.current.cellsRankCounters.datum2algo[datum.name] = 1;

        const barsList = datum();
        // console.log(barsList)

        let randTarget = -1;
        if (state.currentTab == 'searching') {
          randTarget = barsList.at(Tools.randInt(0, barsList.length - 1));
          // console.log(barsList[Tools.randInt(0, barsList.length - 1)])
          // console.log(randTarget)
        }

        acc[datum.name] = algorithms[state.currentTab].map((algo) => {
          stateRef.current.cellsRankCounters.algo2datum[algo.name] = 1;
          const stepsLog: stepsLogT = [];
          const cellCbQueueKey = datum.name + '' + algo.name;
          stateRef.current.cellsStepCbList[cellCbQueueKey] = {
            info: { datumName: datum.name, algoName: algo.name },
          };

          let output;
          if (state.currentTab == 'sorting') {
            // const start = Date.now();
            // console.log(algo.name, datum.name)
            output = algo(barsList, stepsLog);
            // const end = Date.now();
            // const duration = end - start;
            // console.log(algo.name, datum.name, start, end, duration)
          } else {
            // console.log(algo.name, datum.name)
            // interpolation and binary searching algorithms get
            // stuck in an infinite loop when given non-sorted data.
            if (
              !(
                (algo.name === 'interpolation' || algo.name === 'binary') &&
                datum.name !== 'sorted'
              )
            ) {
              output = algo(barsList, randTarget, stepsLog);
              // console.log(output)
            }
          }

          stateRef.current.lastRunData[cellCbQueueKey] = {
            barsList,
            stepsLog,
          };
          return drawCell(cellCbQueueKey);
        });

        return acc;
      },
      {}
    );
  };

  const resetCells = () => {
    // reset play button
    stateRefActions.reset();

    // resetCells
    return genData[state.currentTab].reduce(
      (acc: { [key: string]: JSX.Element[] }, datum) => {
        stateRef.current.cellsRankCounters.datum2algo[datum.name] = 1;

        acc[datum.name] = algorithms[state.currentTab].map((algo) => {
          stateRef.current.cellsRankCounters.algo2datum[algo.name] = 1;
          const cellCbQueueKey = datum.name + '' + algo.name;

          return drawCell(cellCbQueueKey);
        });
        return acc;
      },
      {}
    );
  };

  let tableCells = state.genNew ? genCells() : resetCells();
  // console.log(tableCells)

  return (
    <main className={`flex flex-col items-center`}>
      <p className={`text-left text-gray-600`}>
        <span className={`text-black mr-3`}>Rank: </span>
        time rank
        <span className={`text-red-300 text-2xl font-extrabold`}> / </span>
        best algo for ds
        <span className={`text-red-300 text-2xl font-extrabold`}> / </span>best
        ds for algo
      </p>
      <div aria-label='wrapper' className={`mt-5`}>
        <section aria-label='controls' className={`flex mb-8 gap-3`}>
          {/* icons would be better than text in buttons */}
          <button
            onClick={oneStep}
            className={`border-blue-400 border-2 rounded-md px-3 py-1 capitalize`}
          >
            step
          </button>
          <button
            ref={(el) => {
              stateRef.current.buttons['play'] = el;
            }}
            onClick={runSteps}
            className={`border-blue-400 border-2 rounded-md px-3 py-1 capitalize`}
          >
            play All
          </button>
          <button
            onClick={stateActions.oldCells}
            className={`border-blue-400 border-2 rounded-md px-3 py-1 capitalize`}
          >
            Reset
          </button>
          <button
            onClick={stateActions.newCells}
            className={`border-blue-400 border-2 rounded-md px-3 py-1 capitalize`}
          >
            New Data
          </button>
          <select
            value={state.currentTab}
            onChange={(e) => {
              stateRefActions.clearDataCache();
              stateRefActions.reset();
              stateActions.switchtab(e.target.value);
            }}
            className={`ml-auto border-green-600 border-2 rounded-md px-3 py-1 capitalize`}
          >
            <option>sorting</option>
            <option>searching</option>
          </select>
        </section>
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
      </div>
    </main>
  );
}
