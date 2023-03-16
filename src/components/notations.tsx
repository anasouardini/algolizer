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
    time: { real: number[]; bigO: number[] };
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

  const globalChartData = {
    labels: Array(props.xLength).fill(''),
    datasets: Object.keys(props.notations)
      .map((notationTypeKey: notationsT, typeIndex) => {
        return Object.keys(props.notations[notationTypeKey]).map(
          (notationSubTypeKey, subTypeIndex) => {
            // console.log(props.notations[notationTypeKey][notationSubTypeKey])
            const notation: {
              equation: string;
              color: string;
              notationSteps: number[];
            } = props.notations[notationTypeKey][notationSubTypeKey];
            // console.log(notation);
            const dataset = {
              label: `${notationTypeKey}-${notationSubTypeKey}`,
              data: notation.notationSteps,
              backgroundColor: notation.color,
              tension: 0.3,
            };
            // console.log(dataset);
            return dataset;
          }
        );
      })
      .flat(),
  };
  // console.log(globalChartData)

  const switchNotation = (e) => {
    stateActions.switchNotation(e.target.value);
  };

  return (
    <div aria-label='chart' className={`w-[500px]`}>
      <Line options={globalChartOptions} data={globalChartData} />
    </div>
  );
}
