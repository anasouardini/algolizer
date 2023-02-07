import React from 'react';
import algorithms from '../algos/index';
import genData from '../genData';

import AlgoAnimation from '../components/algoAnimation';

export default function Ranking() {
  const [tabState, setTabState] = React.useState<'sorting' | 'searching'>(
    'sorting'
  );

  const genCells = () => {
    return genData.map((dataItem) => {
      return algorithms[tabState].map((algo) => {
        if (tabState == 'sorting') {
          return (
            <td>
              <AlgoAnimation procedure={[]} />
            </td>
          );
        }

        // TODO: gen a random value to search for
        // TODO: get searching vlaue from the user
        // return <td>{algo(dataItem(), )}</td>;
      });
    });
  };

  const tableCells = genCells();

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>data/algo</th>
            {algorithms[tabState].map((algo) => {
              return <th>{algo.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {genData.map((dataItem, index) => {
            return (
              <tr>
                <th>{dataItem.name}</th>
                {tableCells[index]}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
