import React from 'react';
import Notations from '../components/notations';
import Tools from '../tools';

export default function Charts() {
  const [state, setState] = React.useState<{ timeAxis: number }>({
    timeAxis: 10,
  });
  const stateActions = {
    changeTime: (val: number) => {
      const stateCpy = structuredClone(state);
      stateCpy.timeAxis = val;
      setState(stateCpy);
    },
  };

  type equationsT = {
    [key: string]: {
      [key: string]: {
        time: { bigO: string; real: string };
        space: { bigO: string; real: string };
      };
    };
  };
  const equations: equationsT = {
    sorting: {
      selection: {
        space: { bigO: '1', real: '1+3' },
        time: { bigO: 'Math.pow(x, 2)', real: 'Math.pow(x, 2)+5' },
      },
      insertion: {
        space: { bigO: '1', real: '1+3' },
        time: { bigO: 'Math.pow(x, 2)', real: 'Math.pow(x, 2)+5' },
      },
      bubble: {
        space: { bigO: '1', real: '1+3' },
        time: { bigO: 'Math.pow(x, 2)', real: 'Math.pow(x, 2)+5' },
      },
      quick: {
        space: { bigO: 'Math.log(x)', real: 'Math.log(x)+5' },
        time: { bigO: 'x*Math.log(x)', real: 'x*Math.log(x)+5' },
      },
      merge: {
        space: { bigO: 'x', real: 'x+5' },
        time: { bigO: 'x*Math.log(x)', real: 'x*Math.log(x)+5' },
      },
    },
    searching: {
      linear: {
        space: { bigO: '1', real: '1+5' },
        time: { bigO: 'x', real: 'x+5' },
      },
      binary: {
        space: { bigO: '1', real: '1+5' },
        time: { bigO: 'Math.log(x)', real: 'Math.log(x)+5' },
      },
      interpolation: {
        space: { bigO: '1', real: '1+5' },
        time: { bigO: 'x', real: 'x+5' },
      },
      quickSelect: {
        space: { bigO: 'Math.log(x)', real: 'x*Math.log(x)' },
        time: { bigO: 'Math.log(x)', real: 'x*Math.log(x)' },
      },
    },
  };

  const genNotation = (equation: string) => {
    const output = [];
    for (let x = 1; x <= state.timeAxis; x++) {
      const value = eval(equation);
      output.push(value);
    }
    return output;
  };

  // TODO: select element for sorting and searching
  return (
    <main aria-label='charts' className={`p-5`}>
      <p>
        Notice, as you increase the time axis, the difference between the real
        time complexity and the conventional bigO version is getting diminished
      </p>
      <div aria-label='controls' className={`mt-4`}>
        <input
          type='range'
          min={0}
          max={100}
          onChange={(e) => {
            stateActions.changeTime(parseInt(e.target.value));
          }}
        />
      </div>
      {Object.keys(equations).map((equationCategory) => {
        const equationSubCategories = equations[equationCategory];
        return (
          <div
            key={equationCategory}
            aria-label={`algo-${equationCategory}`}
            className={`w-[500px]`}
          >
            <h2 key={equationCategory} className={`capitalize`}>
              {equationCategory} algorithm
            </h2>
            {Object.keys(equationSubCategories).map((equationSubcategory) => {
              const notationTypes = equationSubCategories[equationSubcategory];
              const notationPairs = {};
              Object.keys(notationTypes).forEach((notationTypeKey) => {
                notationPairs[notationTypeKey] = {};
                Object.keys(notationTypes[notationTypeKey]).forEach(
                  (notationSubTypeKey) => {
                    const equationString =
                      notationTypes[notationTypeKey][notationSubTypeKey];
                    notationPairs[notationTypeKey][notationSubTypeKey] =
                      genNotation(equationString);
                  }
                );
              });
              // console.log(notationPairs)
              return (
                <Notations
                  key={Tools.genid(10)}
                  xLength={state.timeAxis}
                  title={equationSubcategory}
                  notations={notationPairs}
                  colors={[
                    ['rgba(55, 99, 232, 0.9)', 'rgba(55, 99, 232, 0.5)'], //space[bigO, real]
                    ['rgba(255, 99, 132, 0.9)', 'rgba(255, 99, 132, 0.5)'], //time[bigO, real]
                  ]}
                />
              );
            })}
          </div>
        );
      })}
    </main>
  );
}
