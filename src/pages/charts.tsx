import React from 'react';
import Notations from '../components/notations';
import Tools from '../tools';

export default function Charts() {
  const [state, setState] = React.useState<{
    timeAxis: number;
    currentTab: 'sorting' | 'searching';
    chartLabelsFilter: {[key:string]: boolean};
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
    changeLabelsFilter: ({name, show}: {name:string, show:boolean}) => {
      const stateCpy = structuredClone(state);
      stateCpy.chartLabelsFilter[name] = show;
      setState(stateCpy);
    },
  };

  // TODO: add average and best case scenarios.

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
            bigO: 'Math.pow(x, 2)',
            real: 'x-1 + (((x-1) * ((x-1) + 1)) / 2)',
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
            bigO: 'Math.pow(x, 2)',
            real: '((x-1) * ((x-1) + 1)) / 2',
          },
        },
      },
      quick: {
        space: {
          worst: { bigO: 'Math.log(x)', real: 'x/2' },
          average: { bigO: 'Math.log(x)', real: 'x/2' },
          best: { bigO: 'Math.log(x)', real: 'x/2' },
        },
        time: {
          worst: { bigO: 'Math.pow(x, 2)', real: '(x * (x + 1)) / 2' },
          average: { bigO: 'Math.pow(x, 2)', real: '(x * (x + 1)) / 2' },
          best: { bigO: 'Math.pow(x, 2)', real: '(x * (x + 1)) / 2' },
        },
      },
      merge: {
        space: {
          worst: { bigO: 'x', real: 'x + Math.log(x)' },
          average: { bigO: 'x', real: 'x + Math.log(x)' },
          best: { bigO: 'x', real: 'x + Math.log(x)' },
        },
        time: {
          worst: { bigO: 'x*Math.log(x)', real: 'x*Math.log(x)' },
          average: { bigO: 'x*Math.log(x)', real: 'x*Math.log(x)' },
          best: { bigO: 'x*Math.log(x)', real: 'x*Math.log(x)' },
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
          average: { bigO: 'x', real: 'x' },
          best: { bigO: 'x', real: 'x' },
        },
      },
      binary: {
        space: {
          worst: { bigO: '1', real: '1' },
          average: { bigO: '1', real: '1' },
          best: { bigO: '1', real: '1' },
        },
        time: {
          worst: { bigO: 'Math.log(x)', real: 'Math.log(x)' },
          average: { bigO: 'Math.log(x)', real: 'Math.log(x)' },
          best: { bigO: 'Math.log(x)', real: 'Math.log(x)' },
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
          average: { bigO: 'x', real: 'x' },
          best: { bigO: 'x', real: 'x' },
        },
      },
      quickSelect: {
        space: {
          worst: { bigO: 'Math.log(x)', real: 'x/2' },
          average: { bigO: 'Math.log(x)', real: 'x/2' },
          best: { bigO: 'Math.log(x)', real: 'x/2' },
        },
        time: {
          worst: { bigO: 'Math.pow(x, 2)', real: '(x * (x + 1)) / 2' },
          average: { bigO: 'Math.pow(x, 2)', real: '(x * (x + 1)) / 2' },
          best: { bigO: 'Math.pow(x, 2)', real: '(x * (x + 1)) / 2' },
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
          chartXAxisSteps[notationComplexityType] = {};
          Object.keys(notationComplexityTypes[notationComplexityType]).forEach(
            (notationScenario) => {
              const finalNotations =
                notationComplexityTypes[notationComplexityType][
                  notationScenario
                ];
              chartXAxisSteps[notationComplexityType][notationScenario] = {};
              Object.keys(finalNotations).forEach(
                (realOrBigO: 'real' | 'bigO') => {
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
    const show = e.target.checked;//checked means show
    const name = e.target.name;
    stateActions.changeLabelsFilter({name, show})
  };

  const drawLabelsCheckboxes = () => {
    const arbitraryAlgoType = Object.keys(equations[state.currentTab])[0];
    const complexities = equations[state.currentTab][arbitraryAlgoType];
    return Object.keys(complexities).map((complexityType: 'space' | 'time') => {
      let checkboxesList = [];
      // console.log(complexities);
      // console.log(complexityType);
      // console.log(complexities[complexityType]);
      const scenarios = complexities[complexityType];
      Object.keys(scenarios).forEach((scenario) => {
        const realOrBigO = Object.keys(scenarios[scenario]);
        realOrBigO.forEach((realOrBigO: 'real' | 'bigO') => {
          checkboxesList.push(
            <label className={`p-5`}>
              {`${complexityType}-${scenario}-${realOrBigO}`}&nbsp;
              <input
                type='checkbox'
                key={`${complexityType}-${scenario}-${realOrBigO}`}
                name={`${complexityType}-${scenario}-${realOrBigO}`}
                onChange={filterLabels}
              />
            </label>
          );
        });
      });
      return checkboxesList;
    });
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
        <div aria-label={`labels`}>
          <label>{drawLabelsCheckboxes()}</label>
        </div>
      </div>
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
