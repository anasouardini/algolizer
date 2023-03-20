import React from 'react';
import Notations from '../components/notations';
import Tools from '../tools';

export default function Charts() {
  const [state, setState] = React.useState<{
    timeAxis: number;
    currentTab: 'sorting' | 'searching';
    chartLabelsFilter: { [key: string]: boolean };
  }>({
    timeAxis: 10,
    currentTab: 'sorting',
    chartLabelsFilter: {},
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
    changeLabelsFilter: ({ name, show }: { name: string; show: boolean }) => {
      const stateCpy = structuredClone(state);
      stateCpy.chartLabelsFilter[name] = show;
      setState(stateCpy);
    },
  };

  type equationScenariosT = {
    worst: { bigO: string; real: string | number[] };
    average: { bigO: string; real: string | number[] };
    best: { bigO: string; real: string | number[] };
  };
  type equationsT = {
    [key: string]: {
      [key: string]: {
        time: equationScenariosT;
        space: equationScenariosT;
      };
    };
  };
  const equations: equationsT = {
    sorting: {
      selection: {
        space: {
          worst: { bigO: '1', real: '1' },
          average: { bigO: '1', real: '1' },
          best: { bigO: '1', real: '1' },
        },
        time: {
          worst: {
            bigO: 'Math.pow(x, 2)',
            real: 'x-1 + (((x-1) * ((x-1) + 1)) / 2)',
          },
          average: {
            bigO: 'Math.pow(x, 2)',
            real: 'x-1 + (((x-1) * ((x-1) + 1)) / 2)',
          },
          best: {
            bigO: 'Math.pow(x, 2)',
            real: 'x-1 + (((x-1) * ((x-1) + 1)) / 2)',
          },
        },
      },
      insertion: {
        space: {
          worst: { bigO: '1', real: '1' },
          average: { bigO: '1', real: '1' },
          best: { bigO: '1', real: '1' },
        },
        time: {
          worst: {
            bigO: 'Math.pow(x, 2)',
            real: 'x-1 + (((x-1) * ((x-1) + 1)) / 2)',
          },
          average: {
            bigO: 'Math.pow(x, 2)',
            real: 'x-1 + (((x-1) * ((x-1) + 1)) / 2)',
          },
          best: {
            bigO: 'x',
            real: 'x-1',
          },
        },
      },
      bubble: {
        space: {
          worst: { bigO: '1', real: '1' },
          average: { bigO: '1', real: '1' },
          best: { bigO: '1', real: '1' },
        },
        time: {
          worst: {
            bigO: 'Math.pow(x, 2)',
            real: '((x-1) * ((x-1) + 1)) / 2',
          },
          average: {
            bigO: 'Math.pow(x, 2)',
            real: '((x-1) * ((x-1) + 1)) / 2',
          },
          best: {
            bigO: 'x',
            real: 'x-1',
          },
        },
      },
      quick: {
        space: {
          worst: { bigO: 'Math.log2(x)', real: 'x/2' },
          average: { bigO: 'Math.log2(x)', real: 'x/2' },
          best: { bigO: 'Math.log2(x)', real: 'x/2' },
        },
        time: {
          worst: { bigO: 'x* Math.log2(x)', real: 'x* Math.log2(x)' },
          average: { bigO: 'x * Math.log2(x)', real: 'x * Math.log2(x)' },
          best: { bigO: 'x * Math.log2(x)', real: 'x * Math.log2(x + 1)' },
        },
      },
      merge: {
        space: {
          worst: { bigO: 'x', real: 'x + Math.log2(x)' },
          average: { bigO: 'x', real: 'x + Math.log2(x)' },
          best: { bigO: 'x', real: 'x + Math.log2(x)' },
        },
        time: {
          worst: { bigO: 'x*Math.log2(x)', real: 'x*Math.log2(x)' },
          average: { bigO: 'x*Math.log2(x)', real: 'x*Math.log2(x)' },
          best: { bigO: 'x*Math.log2(x)', real: 'x*Math.log2(x)' },
        },
      },
    },
    searching: {
      linear: {
        space: {
          worst: { bigO: '1', real: '1' },
          average: { bigO: '1', real: '1' },
          best: { bigO: '1', real: '1' },
        },
        time: {
          worst: { bigO: 'x', real: 'x' },
          average: { bigO: 'x', real: 'x/2' },
          best: { bigO: '1', real: '1' },
        },
      },
      binary: {
        space: {
          worst: { bigO: '1', real: '1' },
          average: { bigO: '1', real: '1' },
          best: { bigO: '1', real: '1' },
        },
        time: {
          worst: { bigO: 'Math.log2(x)', real: 'Math.log2(x)' },
          average: { bigO: 'Math.log2(x)', real: 'x * Math.log2(x) / (x+1)' },
          best: { bigO: '1', real: '1' },
        },
      },
      interpolation: {
        space: {
          worst: { bigO: '1', real: '1' },
          average: { bigO: '1', real: '1' },
          best: { bigO: '1', real: '1' },
        },
        time: {
          worst: { bigO: 'x', real: 'x' },
          average: {
            bigO: 'Math.log2(Math.log2(x))',
            real: ' 2.42*Math.log2(Math.log2(x))',
          },
          best: { bigO: '1', real: '1' },
        },
      },
      quickSelect: {
        space: {
          worst: { bigO: 'Math.log2(x)', real: 'x/2' },
          average: { bigO: 'Math.log2(x)', real: 'x/2' },
          best: { bigO: 'Math.log2(x)', real: 'x/2' },
        },
        time: {
          worst: { bigO: 'Math.pow(x, 2)', real: 'x*(x + 1)/2' },
          average: { bigO: 'x', real: 'Math.log(2) * x' },
          best: { bigO: 'x', real: 'x' },
        },
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

  const drawCharts = () => {
    return Object.keys(equations[state.currentTab]).map((equationAlgorithm) => {
      const notationComplexityTypes =
        equations[state.currentTab][equationAlgorithm];
      const chartXAxisSteps = {};
      const equationStringList: string[] = [];
      Object.keys(notationComplexityTypes).forEach(
        (notationComplexityType: 'space' | 'time') => {
          if (state.chartLabelsFilter[notationComplexityType] === false) {
            return;
          }
          chartXAxisSteps[notationComplexityType] = {};
          Object.keys(notationComplexityTypes[notationComplexityType]).forEach(
            (notationScenario) => {
              if (state.chartLabelsFilter[notationScenario] === false) {
                return;
              }
              const finalNotations =
                notationComplexityTypes[notationComplexityType][
                  notationScenario
                ];
              chartXAxisSteps[notationComplexityType][notationScenario] = {};
              Object.keys(finalNotations).forEach(
                (realOrBigO: 'real' | 'bigO') => {
                  if (state.chartLabelsFilter[realOrBigO] === false) {
                    return;
                  }
                  const equationString =
                    notationComplexityTypes[notationComplexityType][
                      notationScenario
                    ][realOrBigO];
                  let colorOpacity = 0.9;
                  if (realOrBigO == 'real') {
                    colorOpacity = 0.5;
                  }
                  let notationColor = `rgba(55, 99, 232, ${colorOpacity})`;
                  if (notationComplexityType == 'time') {
                    notationColor = `rgba(255, 99, 132, ${colorOpacity})`;
                  }

                  chartXAxisSteps[notationComplexityType][notationScenario][
                    realOrBigO
                  ] = {
                    equation: equationString,
                    color: notationColor,
                    notationSteps: genNotationSteps(equationString),
                  };

                  equationStringList.push(equationString);
                }
              );
            }
          );
        }
      );
      // console.log(chartNotationsSteps)
      return (
        <Notations
          key={Tools.genid(10)}
          xLength={state.timeAxis}
          title={equationAlgorithm}
          notations={chartXAxisSteps}
        />
      );
    });
  };

  const filterLabels = (e) => {
    const show = e.target.checked; //checked means show
    const name = e.target.name;
    stateActions.changeLabelsFilter({ name, show });
  };

  const drawLabelsCheckboxes = () => {
    const checkboxesKeys = {
    Complexity: ['space', 'time'],
      Scenario: ['best', 'average', 'worst'],
      Accuracy: ['real', 'bigO']
    };
    return Object.keys(checkboxesKeys)
      .map((keysSubList) => {
        const checkboxGroupKey = checkboxesKeys[keysSubList].join('/');
        return (
          <div aria-label={checkboxGroupKey} key={checkboxGroupKey} className={`flex gap-4`}>
            {`${keysSubList}: `}&nbsp;
            {checkboxesKeys[keysSubList].map((keyString: string) => {
              let checked = true;
              if (state.chartLabelsFilter[keyString] === false) {
                checked = false;
              }
              return (
                <label key={keyString} className={`text-gray-600`}>
                  {keyString}&nbsp;
                  <input
                    type='checkbox'
                    key={keyString}
                    name={keyString}
                    checked={checked}
                    onChange={filterLabels}
                  />
                </label>
              );
            })}
          </div>
        );
      })
      .flat();
  };

  return (
    <main aria-label='charts' className={`p-5`}>
      <p className={`max-w-[600px] text-gray-600`}>
        Notice, in some charts, as you increase the time axis, the difference
        between the real time complexity and the conventional bigO version is
        getting diminished
      </p>
      {/* don't miss with controls paddings, css is finicky. */}
      <section aria-label='controls' className={`my-6 flex flex-col align-center gap-5`}>
        <div className={`my-6 flex align-center gap-5`}>
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
        <div aria-label={`notations filter`} className={``}>
          {drawLabelsCheckboxes()}
        </div>
      </section>
      <div
        key={state.currentTab}
        aria-label={`algo-${state.currentTab}`}
        className={`flex flex-wrap gap-6`}
      >
        {drawCharts()}
      </div>
    </main>
  );
}
