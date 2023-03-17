import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type propsT = {
  xLength: number;
  notations: {
    time: {
      worst: {
        color: string;
        equation: { real: string; bigO: string };
        notationSteps: { real: number[]; bigO: number[] };
      };
      average: {
        color: string;
        equation: { real: string; bigO: string };
        notationSteps: { real: number[]; bigO: number[] };
      };
      best: {
        color: string;
        equation: { real: string; bigO: string };
        notationSteps: { real: number[]; bigO: number[] };
      };
    };
    space: { real: number[]; bigO: number[] };
  };
  title: string;
  equations: string[];
};
export default function Notations(props: propsT) {
  type notationsT = 'real' | 'bigO';

  const [state, setState] = React.useState<{ currentNotation: notationsT }>({
    currentNotation: 'bigO',
  });
  const stateActions = {
    switchNotation: (notation: notationsT) => {
      const stateCpy = structuredClone(state);
      stateCpy.currentNotation = notation;
      setState(stateCpy);
    },
  };

  const globalChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const genDatasets = () => {
    // console.log(props.notations);
    const dataSets = Object.keys(props.notations)
      .map((complexityType: notationsT, typeIndex) => {
        return Object.keys(props.notations[complexityType]).map(
          (notationScenario) => {
            return Object.keys(
              props.notations[complexityType][notationScenario]
            ).map((realOrBigO) => {
              // console.log(props.notations[notationTypeKey][notationSubTypeKey])
              const notation: {
                equation: string;
                color: string;
                notationSteps: number[];
              } = props.notations[complexityType][notationScenario][realOrBigO];
                // console.log(notation);
              const dataset = {
                label: `${notationScenario} ${complexityType} ${realOrBigO}: ${notation.equation}`,
                data: notation.notationSteps,
                backgroundColor: notation.color,
                tension: 0.3,
              };
              // console.log(dataset);
              return dataset;
            });
          }
        );
      })
      .flat(2);

    // console.log(dataSets)
    return dataSets;
  };

  const globalChartData = {
    labels: Array(props.xLength).fill(''),
    datasets: genDatasets(),
  };
  // console.log(globalChartData)

  const switchNotation = (e) => {
    stateActions.switchNotation(e.target.value);
  };

  return (
    <div aria-label='chart' className={`w-[600px]`}>
      <Line options={globalChartOptions} data={globalChartData} />
    </div>
  );
}
