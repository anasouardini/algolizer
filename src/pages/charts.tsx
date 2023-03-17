import React from 'react';
import Notations from '../components/notations';
import Tools from '../tools';

export default function Charts() {
  const [state, setState] = React.useState<{
    timeAxis: number;
    currentTab: 'sorting' | 'searching';
  }>({
    timeAxis: 10,
    currentTab: 'sorting',
  });
  const stateActions = {
    changeTime: (val: number) => {
      const stateCpy = structuredClone(state);
      stateCpy.timeAxis = val;
      setState(stateCpy);
    },
    changeTab: (val: 'sorting' | 'searching') => {
      const stateCpy = structuredClone(state);
      stateCpy.currentTab = val;
      setState(stateCpy);
    },
  };

  // TODO: add average and best case scenarios.

  type equationsT = {
    [key: string]: {
      [key: string]: {
        time: { bigO: string; real: string | number[] };
        space: { bigO: string; real: string | number[] };
      };
    };
  };
  const equations: equationsT = {
    sorting: {
      selection: {
        space: { bigO: '1', real: '1' },
        time: {
          bigO: 'Math.pow(x, 2)',
          real: 'x-1 + (((x-1) * ((x-1) + 1)) / 2)',
        },
      },
      insertion: {
        space: { bigO: '1', real: '1' },
        time: {
          bigO: 'Math.pow(x, 2)',
          real: 'x-1 + (((x-1) * ((x-1) + 1)) / 2)',
        },
      },
      bubble: {
        space: { bigO: '1', real: '1' },
        time: {
          bigO: 'Math.pow(x, 2)',
          real: '((x-1) * ((x-1) + 1)) / 2',
        },
      },
      quick: {
        space: { bigO: 'Math.log(x)', real: 'x/2' },
        time: { bigO: 'Math.pow(x, 2)', real: '(x * (x + 1)) / 2' },
      },
      merge: {
        space: { bigO: 'x', real: 'x + Math.log(x)' },
        time: { bigO: 'x*Math.log(x)', real: 'x*Math.log(x)' },
      },
    },
    searching: {
      linear: {
        space: { bigO: '1', real: '1' },
        time: { bigO: 'x', real: 'x' },
      },
      binary: {
        space: { bigO: '1', real: '1' },
        time: { bigO: 'Math.log(x)', real: 'Math.log(x)' },
      },
      interpolation: {
        space: { bigO: '1', real: '1' },
        time: { bigO: 'x', real: 'x' },
      },
      quickSelect: {
        space: { bigO: 'Math.log(x)', real: 'x/2' },
        time: { bigO: 'Math.pow(x, 2)', real: '(x * (x + 1)) / 2' },
      },
    },
  };

  const genNotationSteps = (equation: string | []) => {
    if (typeof equation == 'object') {
      return equation;
    }

    const output = [];
    for (let x = 1; x <= state.timeAxis; x++) {
      const value = eval(equation);
      output.push(value);
    }
    return output;
  };

  return (
    <main aria-label='charts' className={`p-5`}>
      <p className={`max-w-[600px] text-gray-600`}>
        Notice, in some charts, as you increase the time axis, the difference
        between the real time complexity and the conventional bigO version is
        getting diminished
      </p>
      {/* don't miss with controls paddings, css is finicky. */}
      <div aria-label='controls' className={`my-6 flex align-center gap-5`}>
        <label className={`py-1`}>
          <select
            onChange={(e) => {
              stateActions.changeTab(e.target.value);
            }}
            className={`border-2 border-blue-400 rounded py-1`}
          >
            <option>sorting</option>
            <option>searching</option>
          </select>
        </label>
        <label className={`flex text-center py-2`}>
          X-Axis:&nbsp;
          <input
            type='range'
            min={0}
            max={100}
            onChange={(e) => {
              stateActions.changeTime(parseInt(e.target.value));
            }}
            className={`accent-blue-500`}
          />
        </label>
      </div>
      <div
        key={state.currentTab}
        aria-label={`algo-${state.currentTab}`}
        className={`flex flex-wrap gap-6`}
      >
        {Object.keys(equations[state.currentTab]).map((equationCategory) => {
          const notationTypes = equations[state.currentTab][equationCategory];
          const chartNotationsSteps = {};
          const equationStringList: string[] = [];
          Object.keys(notationTypes).forEach((notationTypeKey) => {
            chartNotationsSteps[notationTypeKey] = {};
            Object.keys(notationTypes[notationTypeKey]).forEach(
              (notationSubTypeKey) => {
                const equationString =
                  notationTypes[notationTypeKey][notationSubTypeKey];
                let colorOpacity = 0.9;
                if (notationSubTypeKey == 'real') {
                  colorOpacity = 0.5;
                }
                let notationColor = `rgba(55, 99, 232, ${colorOpacity})`;
                if (notationTypeKey == 'time') {
                  notationColor = `rgba(255, 99, 132, ${colorOpacity})`;
                }

                chartNotationsSteps[notationTypeKey][notationSubTypeKey] = {
                  equation: equationString,
                  color: notationColor,
                  notationSteps: genNotationSteps(equationString),
                };

                equationStringList.push(equationString);
              }
            );
          });
          // console.log(chartNotationsSteps)
          return (
            <Notations
              key={Tools.genid(10)}
              xLength={state.timeAxis}
              title={equationCategory}
              notations={chartNotationsSteps}
            />
          );
        })}
      </div>
    </main>
  );
}
