type logStepTypeT =
  | 'compare'
  | 'found'
  | 'notFound'
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
  element?:
    | { type: 'index' | 'value'; value: number };
  elements?:
    | { type: 'index' | 'value'; value: number }[]
    | number[]
    | { from: number; to: number };
  range?: { start: number; end: number };
  chunks?: { start: number; end: number }[];
  value?: number;
}[];
export type { logStepTypeT, stepsLogT };
