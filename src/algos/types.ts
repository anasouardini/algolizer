type logStepTypeT =
  | 'compare'
  | 'swap'
  | 'replace'
  | 'reduce'
  | 'shift'
  | 'calc'
  | 'push'
  | 'split'
  | 'concat';
type stepsLogT = {
  type: logStepTypeT;
  elements?:
    | { type: 'index' | 'value'; value: number }[]
    | number[]
    | { from: number; to: number };
  range?: { start: number; end: number };
  chunks?: { start: number; end: number }[];
  value?: number;
}[];
export type { stepsLogT };
